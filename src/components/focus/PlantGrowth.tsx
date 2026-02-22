import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useFocusStore, selectProgressPercent } from '../../stores/useFocusStore';
import { getFocusPlant } from '../../constants/items';

interface PlantGrowthProps {
  targetDurationMinutes: number;
}

/**
 * Renders a growing plant animation during a focus session.
 * The plant grows in real-time as the session progresses.
 */
export function PlantGrowth({ targetDurationMinutes }: PlantGrowthProps) {
  const progress = useFocusStore(selectProgressPercent);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const plant = getFocusPlant(targetDurationMinutes);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.3 + progress * 0.7,
      useNativeDriver: true,
      damping: 20,
      stiffness: 100,
    }).start();
  }, [progress, scaleAnim]);

  if (!plant) return null;

  return (
    <View style={styles.container} testID="plant-growth">
      <Animated.View
        style={[
          styles.plant,
          { transform: [{ scale: scaleAnim }] },
        ]}
        testID="plant-visual"
      >
        <Text style={styles.plantEmoji}>{getPlantEmoji(plant.plantType)}</Text>
      </Animated.View>
      <Text style={styles.description}>{plant.description}</Text>
    </View>
  );
}

function getPlantEmoji(plantType: string): string {
  const emojiMap: Record<string, string> = {
    'succulent': '🌵',
    'potted-herb': '🌱',
    'flowering-plant': '🌸',
    'full-bloom': '🌺',
  };
  return emojiMap[plantType] ?? '🌿';
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  plant: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantEmoji: {
    fontSize: 50,
  },
  description: {
    fontSize: 12,
    color: '#8B7D72',
    fontStyle: 'italic',
  },
});
