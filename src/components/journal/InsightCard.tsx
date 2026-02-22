import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EMPTY_STATES } from '../../constants/copy';

interface InsightCardProps {
  insight: string | null;
  hasEnoughData: boolean;
}

export function InsightCard({ insight, hasEnoughData }: InsightCardProps) {
  if (!hasEnoughData) {
    return (
      <View style={[styles.container, styles.muted]} testID="insight-card-empty">
        <Text style={styles.mutedText}>{EMPTY_STATES.noInsights}</Text>
      </View>
    );
  }

  if (!insight) return null;

  return (
    <View style={styles.container} testID="insight-card">
      <Text style={styles.header}>Insights</Text>
      <Text style={styles.insight}>{insight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2DDD0',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  muted: {
    backgroundColor: '#FAF6F1',
  },
  header: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4845A',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  insight: {
    fontSize: 14,
    color: '#2C2420',
    lineHeight: 22,
  },
  mutedText: {
    fontSize: 13,
    color: '#B8ADA4',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
