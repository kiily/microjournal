import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { FOCUS_PRESETS, useFocusStore, selectRemainingSeconds, selectProgressPercent } from '../../stores/useFocusStore';
import { formatTimer } from '../../lib/dates';
import { FOCUS } from '../../constants/copy';

interface FocusTimerProps {
  onBegin: () => void;
  onCancel: () => void;
}

export function FocusTimer({ onBegin, onCancel }: FocusTimerProps) {
  const { targetDuration, status, elapsedSeconds, setTargetDuration } = useFocusStore();
  const remainingSeconds = useFocusStore(selectRemainingSeconds);
  const progress = useFocusStore(selectProgressPercent);

  const isRunning = status === 'running';
  const isCompleted = status === 'completed';

  return (
    <View style={styles.container} testID="focus-timer">
      {/* Timer display */}
      <View style={styles.timerContainer}>
        <View style={styles.progressRingOuter}>
          <View
            style={[
              styles.progressRingFill,
              { width: `${progress * 100}%` },
            ]}
          />
          <Text style={styles.timerText} testID="timer-display">
            {formatTimer(remainingSeconds)}
          </Text>
        </View>
      </View>

      {/* Presets */}
      {!isRunning && (
        <View style={styles.presets} testID="timer-presets">
          {FOCUS_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset}
              style={[
                styles.presetButton,
                targetDuration === preset && styles.presetButtonActive,
              ]}
              onPress={() => setTargetDuration(preset)}
              testID={`preset-${preset}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: targetDuration === preset }}
            >
              <Text
                style={[
                  styles.presetText,
                  targetDuration === preset && styles.presetTextActive,
                ]}
              >
                {preset}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Action button */}
      {!isRunning && !isCompleted && (
        <TouchableOpacity
          style={styles.beginButton}
          onPress={onBegin}
          testID="focus-begin-button"
          accessibilityRole="button"
          accessibilityLabel={FOCUS.begin}
        >
          <Text style={styles.beginText}>{FOCUS.begin}</Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedBanner} testID="focus-completed">
          <Text style={styles.completedText}>Session complete ✦</Text>
        </View>
      )}

      {/* Cancel */}
      <TouchableOpacity
        style={styles.cancelArea}
        onPress={onCancel}
        testID="focus-cancel-button"
        accessibilityRole="button"
      >
        <Text style={styles.cancelText}>{FOCUS.cancel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    paddingVertical: 40,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#F2DDD0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressRingFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#D4845A',
    opacity: 0.2,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#2C2420',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  presets: {
    flexDirection: 'row',
    gap: 12,
  },
  presetButton: {
    width: 56,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D4CEC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetButtonActive: {
    borderColor: '#D4845A',
    backgroundColor: '#F2DDD0',
  },
  presetText: {
    fontSize: 14,
    color: '#8B7D72',
    fontWeight: '500',
  },
  presetTextActive: {
    color: '#D4845A',
  },
  beginButton: {
    backgroundColor: '#D4845A',
    borderRadius: 100,
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  beginText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  completedBanner: {
    backgroundColor: '#F2DDD0',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  completedText: {
    fontSize: 16,
    color: '#D4845A',
    fontWeight: '500',
  },
  cancelArea: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 14,
    color: '#B8ADA4',
  },
});
