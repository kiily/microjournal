import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { router } from 'expo-router';
import { getDatabase } from '../../src/db/client';
import { focusSession } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import { useFocusStore, selectElapsedMinutes, selectRemainingSeconds } from '../../src/stores/useFocusStore';
import { useRoomItems } from '../../src/hooks/useRoomItems';
import { FocusTimer } from '../../src/components/focus/FocusTimer';
import { SoundPicker } from '../../src/components/focus/SoundPicker';
import { PlantGrowth } from '../../src/components/focus/PlantGrowth';
import { FOCUS } from '../../src/constants/copy';
import { getFocusPlant } from '../../src/constants/items';

export default function FocusScreen() {
  const {
    targetDuration,
    ambientSound,
    sessionId,
    status,
    startSession,
    tickElapsed,
    completeSession,
    cancelSession,
    setAmbientSound,
    reset,
  } = useFocusStore();

  const remainingSeconds = useFocusStore(selectRemainingSeconds);
  const elapsedMinutes = useFocusStore(selectElapsedMinutes);
  const { addFocusPlant } = useRoomItems();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start tick on session begin
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        tickElapsed();
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, tickElapsed]);

  // Auto-complete when timer reaches 0
  useEffect(() => {
    if (status === 'running' && remainingSeconds === 0) {
      handleComplete();
    }
  }, [remainingSeconds, status]);

  async function handleBegin() {
    const db = getDatabase();
    const result = await db
      .insert(focusSession)
      .values({
        targetDurationMinutes: targetDuration,
        ambientSound: ambientSound,
        blockedApps: '[]',
      })
      .returning();

    startSession(result[0].id);
  }

  async function handleComplete() {
    completeSession();

    if (sessionId) {
      const db = getDatabase();
      const plant = getFocusPlant(targetDuration);
      await db
        .update(focusSession)
        .set({
          completed: true,
          actualDurationMinutes: targetDuration,
          rewardPlantType: plant?.plantType ?? null,
          endedAt: new Date().toISOString(),
        })
        .where(eq(focusSession.id, sessionId));

      // Add plant to room
      await addFocusPlant(targetDuration, sessionId);
    }
  }

  function handleCancel() {
    if (status === 'running') {
      Alert.alert(
        FOCUS.leaveWarning,
        '',
        [
          { text: FOCUS.leaveCancel, style: 'cancel' },
          {
            text: FOCUS.leaveConfirm,
            style: 'destructive',
            onPress: async () => {
              cancelSession();
              if (sessionId) {
                const db = getDatabase();
                await db
                  .update(focusSession)
                  .set({
                    actualDurationMinutes: elapsedMinutes,
                    endedAt: new Date().toISOString(),
                  })
                  .where(eq(focusSession.id, sessionId));
              }
              reset();
              router.back();
            },
          },
        ],
      );
    } else {
      reset();
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Plant growth animation (visible during session) */}
        {status === 'running' && (
          <PlantGrowth targetDurationMinutes={targetDuration} />
        )}

        {/* Timer */}
        <FocusTimer onBegin={handleBegin} onCancel={handleCancel} />

        {/* Sound picker (only visible before session starts) */}
        {status === 'idle' && (
          <SoundPicker selectedSound={ambientSound} onSoundSelect={setAmbientSound} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1917',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
});
