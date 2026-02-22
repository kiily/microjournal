import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { eq } from 'drizzle-orm';
import { getDatabase } from '../../src/db/client';
import { userProfile, habit } from '../../src/db/schema';
import { useAppStore } from '../../src/stores/useAppStore';
import { useDayStore } from '../../src/stores/useDayStore';
import { useRoomStore } from '../../src/stores/useRoomStore';
import { useMoodEntry } from '../../src/hooks/useMoodEntry';
import { useHabits } from '../../src/hooks/useHabits';
import { useRoomItems } from '../../src/hooks/useRoomItems';
import { RoomScene } from '../../src/components/room/RoomScene';
import { MoodPicker } from '../../src/components/checkin/MoodPicker';
import { HabitList } from '../../src/components/checkin/HabitList';
import { ONBOARDING } from '../../src/constants/copy';
import type { MoodLevel } from '../../src/types';

type OnboardingStep = 'room' | 'name' | 'mood' | 'habits' | 'completion' | 'done';

export default function OnboardingScreen() {
  const [step, setStep] = useState<OnboardingStep>('room');
  const [displayName, setDisplayName] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const { profile, updateDisplayName, completeOnboarding } = useAppStore();
  const { setMoodLevel } = useRoomStore();
  const { habits } = useDayStore();
  const { saveMoodEntry } = useMoodEntry();
  const { loadHabitsForToday, toggleHabit } = useHabits();
  const { items, addInstantFeedbackItem } = useRoomItems();

  useEffect(() => {
    loadHabitsForToday();
  }, [loadHabitsForToday]);

  // Show room first, then overlay appears after 2s
  useEffect(() => {
    if (step === 'room') {
      const timeout = setTimeout(() => {
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Move to name step after showing room intro
        setTimeout(() => {
          setStep('name');
        }, 3000);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [step, overlayOpacity]);

  const handleNameSubmit = async () => {
    if (!displayName.trim()) return;

    const db = getDatabase();
    if (profile?.id) {
      await db
        .update(userProfile)
        .set({ displayName: displayName.trim() })
        .where(eq(userProfile.id, profile.id));
    }
    updateDisplayName(displayName.trim());
    setStep('mood');
  };

  const handleMoodSelect = async (level: MoodLevel) => {
    setSelectedMood(level);
    setMoodLevel(level);
    await saveMoodEntry(level, [], '');
    setStep('habits');
  };

  const handleHabitToggle = async (habitId: string) => {
    await toggleHabit(habitId);
    setStep('completion');
  };

  const handleComplete = async () => {
    const db = getDatabase();
    if (profile?.id) {
      await db
        .update(userProfile)
        .set({ onboarded: true })
        .where(eq(userProfile.id, profile.id));
    }
    completeOnboarding();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RoomScene
        items={items}
        timeOfDay="morning"
        moodLevel={selectedMood}
        shimmeringZone={null}
      />

      {step === 'room' && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Text style={styles.overlayText}>{ONBOARDING.roomIntro1}</Text>
          <Text style={styles.overlaySubtext}>{ONBOARDING.roomIntro2}</Text>
        </Animated.View>
      )}

      {step === 'name' && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.card}
        >
          <View style={styles.cardInner}>
            <Text style={styles.cardPrompt}>{ONBOARDING.namePrompt}</Text>
            <TextInput
              style={styles.nameInput}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              placeholderTextColor="#B8ADA4"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleNameSubmit}
              testID="onboarding-name-input"
            />
            <TouchableOpacity
              style={[styles.continueButton, !displayName.trim() && styles.continueButtonDisabled]}
              onPress={handleNameSubmit}
              disabled={!displayName.trim()}
              testID="onboarding-continue-button"
            >
              <Text style={styles.continueButtonText}>{ONBOARDING.nameButton}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {step === 'mood' && (
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.contextText}>{ONBOARDING.moodIntro}</Text>
            <MoodPicker selectedLevel={selectedMood} onSelect={handleMoodSelect} />
          </View>
        </View>
      )}

      {step === 'habits' && (
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.contextText}>{ONBOARDING.habitsIntro}</Text>
            <HabitList
              habits={habits}
              onToggle={handleHabitToggle}
            />
          </View>
        </View>
      )}

      {step === 'completion' && (
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.contextText}>{ONBOARDING.completionCta}</Text>
            <Text style={styles.completionNote}>{ONBOARDING.done}</Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleComplete}
              testID="onboarding-done-button"
            >
              <Text style={styles.continueButtonText}>Enter your room</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1',
  },
  overlay: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 8,
  },
  overlayText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2C2420',
    textAlign: 'center',
  },
  overlaySubtext: {
    fontSize: 18,
    color: '#8B7D72',
    textAlign: 'center',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardInner: {
    backgroundColor: '#F5EDE4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 16,
    paddingBottom: 40,
  },
  cardPrompt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C2420',
    textAlign: 'center',
  },
  contextText: {
    fontSize: 16,
    color: '#8B7D72',
    textAlign: 'center',
  },
  nameInput: {
    fontSize: 18,
    color: '#2C2420',
    borderBottomWidth: 2,
    borderBottomColor: '#D4845A',
    paddingVertical: 10,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#D4845A',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#D4CEC8',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completionNote: {
    fontSize: 14,
    color: '#B8ADA4',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
