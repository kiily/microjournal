import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RoomItem } from '../../types';
import { getItemCatalogForCategory } from '../../constants/items';

interface ItemInfoCardProps {
  item: RoomItem;
  habitName?: string;
  totalDays?: number;
  onClose: () => void;
}

export function ItemInfoCard({ item, habitName, totalDays, onClose }: ItemInfoCardProps) {
  const tierLabels = ['', 'Tier 1', 'Tier 2', 'Tier 3'];
  const nextThresholds = [3, 10, 30];

  const daysToNextTier =
    item.tier < 3 && totalDays !== undefined
      ? Math.max(0, nextThresholds[item.tier] - totalDays)
      : null;

  return (
    <View style={styles.container} testID="item-info-card">
      <TouchableOpacity style={styles.closeButton} onPress={onClose} testID="item-info-close">
        <Ionicons name="close" size={20} color="#8B7D72" />
      </TouchableOpacity>

      <Text style={styles.itemType}>
        {item.itemType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
      </Text>

      <View style={styles.tierBadge}>
        <Text style={styles.tierText}>{tierLabels[item.tier]}</Text>
      </View>

      {habitName && (
        <Text style={styles.habitLabel}>
          Unlocked by <Text style={styles.habitName}>{habitName}</Text>
        </Text>
      )}

      {totalDays !== undefined && (
        <Text style={styles.statsText}>{totalDays} days completed</Text>
      )}

      {daysToNextTier !== null && daysToNextTier > 0 && (
        <Text style={styles.nextTierText}>
          {daysToNextTier} more to upgrade
        </Text>
      )}

      {item.tier === 3 && (
        <Text style={styles.maxTierText}>Fully grown ✦</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
    backgroundColor: '#F5EDE4',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E0D8',
  },
  itemType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2420',
    marginBottom: 8,
    marginRight: 40,
  },
  tierBadge: {
    backgroundColor: '#D4845A',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  tierText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  habitLabel: {
    fontSize: 13,
    color: '#8B7D72',
    marginBottom: 4,
  },
  habitName: {
    color: '#2C2420',
    fontWeight: '500',
  },
  statsText: {
    fontSize: 13,
    color: '#8B7D72',
  },
  nextTierText: {
    fontSize: 12,
    color: '#D4845A',
    marginTop: 8,
    fontStyle: 'italic',
  },
  maxTierText: {
    fontSize: 13,
    color: '#9DB88C',
    marginTop: 8,
    fontWeight: '500',
  },
});
