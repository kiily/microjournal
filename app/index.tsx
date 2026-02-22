import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '../src/stores/useAppStore';
import { useDayStore } from '../src/stores/useDayStore';
import { useRoomStore } from '../src/stores/useRoomStore';
import { useMoodEntry } from '../src/hooks/useMoodEntry';
import { useHabits } from '../src/hooks/useHabits';
import { useRoomItems } from '../src/hooks/useRoomItems';
import { useTimeOfDay } from '../src/hooks/useTimeOfDay';
import { RoomScene } from '../src/components/room/RoomScene';
import { GreetingBar } from '../src/components/ui/GreetingBar';
import { BottomSheet } from '../src/components/ui/BottomSheet';
import { CheckInSheet } from '../src/components/checkin/CheckInSheet';
import { ItemInfoCard } from '../src/components/room/ItemInfoCard';
import type { SnapPoint } from '../src/components/ui/BottomSheet';
import type { MoodLevel, MoodTag } from '../src/types';
import { calculateHabitTier, detectTierChanges } from '../src/lib/progress';
import { getTodayString } from '../src/lib/dates';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function RoomScreen() {
  const [sheetSnapPoint, setSheetSnapPoint] = useState<SnapPoint>('peeking');
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [selectedTags, setSelectedTags] = useState<MoodTag[]>([]);
  const [noteValue, setNoteValue] = useState('');

  const timeOfDay = useTimeOfDay();
  const { profile, isOnboarded, isLoading } = useAppStore();
  const { habits } = useDayStore();
  const { moodLevel, selectedItemId, isInspecting, shimmeringZone, setTimeOfDay, setMoodLevel, selectItem } = useRoomStore();
  const { todayMood, loadTodayMood, saveMoodEntry } = useMoodEntry();
  const { loadHabitsForToday, toggleHabit } = useHabits();
  const { items, loadRoomItems, addInstantFeedbackItem, unlockOrUpgradeItem } = useRoomItems();

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      await Promise.all([loadTodayMood(), loadHabitsForToday(), loadRoomItems()]);
    };
    init();
  }, [loadTodayMood, loadHabitsForToday, loadRoomItems]);

  // Sync time of day to room store
  useEffect(() => {
    setTimeOfDay(timeOfDay);
  }, [timeOfDay, setTimeOfDay]);

  // Redirect to onboarding if not onboarded
  useEffect(() => {
    if (!isLoading && !isOnboarded) {
      router.replace('/onboarding');
    }
  }, [isLoading, isOnboarded]);

  // Restore today's mood to state
  useEffect(() => {
    if (todayMood) {
      setSelectedMood(todayMood.moodLevel);
      setSelectedTags(todayMood.tags);
      setNoteValue(todayMood.note);
      setMoodLevel(todayMood.moodLevel);
    }
  }, [todayMood, setMoodLevel]);

  const handleMoodSelect = useCallback(
    async (level: MoodLevel) => {
      setSelectedMood(level);
      setMoodLevel(level);
      await saveMoodEntry(level, selectedTags, noteValue);
    },
    [selectedTags, noteValue, saveMoodEntry, setMoodLevel],
  );

  const handleTagsChange = useCallback(
    async (tags: MoodTag[]) => {
      setSelectedTags(tags);
      if (selectedMood !== null) {
        await saveMoodEntry(selectedMood, tags, noteValue);
      }
    },
    [selectedMood, noteValue, saveMoodEntry],
  );

  const handleNoteChange = useCallback((text: string) => {
    setNoteValue(text);
  }, []);

  const handleHabitToggle = useCallback(
    async (habitId: string) => {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const wasCompleted = habit.completedToday;
      await toggleHabit(habitId);

      // First ever habit completion — add instant feedback item
      const today = getTodayString();
      const completedCount = habits.filter((h) => h.completedToday).length;
      if (!wasCompleted && completedCount === 0) {
        await addInstantFeedbackItem();
      }

      // Check for tier unlocks after toggling
      if (!wasCompleted) {
        const newTotal = habit.totalCompletions + 1;
        const oldTier = calculateHabitTier(habit.totalCompletions);
        const newTier = calculateHabitTier(newTotal);

        if (newTier > oldTier && newTier > 0) {
          await unlockOrUpgradeItem(habitId, habit.category, newTier);
        }
      }
    },
    [habits, toggleHabit, addInstantFeedbackItem, unlockOrUpgradeItem],
  );

  // Swipe left to go to journal
  const swipeStartX = useRef<number | null>(null);
  const handleRoomSwipe = useCallback(
    (event: { nativeEvent: { pageX: number } }, type: 'start' | 'end') => {
      if (type === 'start') {
        swipeStartX.current = event.nativeEvent.pageX;
      } else if (type === 'end' && swipeStartX.current !== null) {
        const dx = event.nativeEvent.pageX - swipeStartX.current;
        if (dx < -SWIPE_THRESHOLD) {
          router.push('/journal');
        }
        swipeStartX.current = null;
      }
    },
    [],
  );

  const selectedItem = selectedItemId ? items.find((i) => i.id === selectedItemId) : null;
  const selectedHabit = selectedItem?.sourceHabitId
    ? habits.find((h) => h.id === selectedItem.sourceHabitId)
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <GreetingBar
        displayName={profile?.displayName ?? ''}
        timeOfDay={timeOfDay}
        onSettingsPress={() => router.push('/settings')}
        onFocusPress={() => router.push('/focus')}
      />

      {/* Room — occupies most of the screen */}
      <View
        onTouchStart={(e) => handleRoomSwipe(e, 'start')}
        onTouchEnd={(e) => handleRoomSwipe(e, 'end')}
        style={styles.roomWrapper}
      >
        <RoomScene
          items={items}
          timeOfDay={timeOfDay}
          moodLevel={selectedMood}
          shimmeringZone={shimmeringZone}
          onItemTap={(itemId) => selectItem(itemId)}
          onAvatarTap={() => setSheetSnapPoint('peeking')}
          onDoubleTap={() => {}} // Reset camera handled internally
        />
      </View>

      {/* Item info card overlay */}
      {isInspecting && selectedItem && (
        <ItemInfoCard
          item={selectedItem}
          habitName={selectedHabit?.name}
          totalDays={selectedHabit?.totalCompletions}
          onClose={() => selectItem(null)}
        />
      )}

      {/* Bottom sheet — mood + habits + note */}
      <BottomSheet
        snapPoint={sheetSnapPoint}
        onSnapPointChange={setSheetSnapPoint}
      >
        <CheckInSheet
          habits={habits}
          selectedMood={selectedMood}
          selectedTags={selectedTags}
          noteValue={noteValue}
          onMoodSelect={handleMoodSelect}
          onTagsChange={handleTagsChange}
          onNoteChange={handleNoteChange}
          onHabitToggle={handleHabitToggle}
          onAddHabit={() => router.push('/habit/new')}
          onManageHabits={() => router.push('/habit/manage')}
          onLongPressHabit={(habitId) => router.push(`/habit/${habitId}`)}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  roomWrapper: {
    flex: 1,
  },
});
