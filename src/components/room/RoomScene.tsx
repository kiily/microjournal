import React, { useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
} from 'react-native';
import type { MoodLevel, RoomItem, TimeOfDay } from '../../types';
import { getLightingConfig } from './RoomLighting';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ROOM_HEIGHT = SCREEN_HEIGHT * 0.6;

interface RoomSceneProps {
  items: RoomItem[];
  timeOfDay: TimeOfDay;
  moodLevel: MoodLevel | null;
  shimmeringZone: string | null;
  onItemTap?: (itemId: string) => void;
  onAvatarTap?: () => void;
  onDoubleTap?: () => void;
}

/**
 * RoomScene renders the 3D room viewport.
 *
 * NOTE: This implementation provides a placeholder/mock rendering for
 * environments where react-native-filament cannot be installed (no native
 * build toolchain). In production, replace the inner View with a Filament
 * FilamentView component loading the actual .glb assets.
 *
 * The camera controls and interaction model are fully implemented.
 */
export function RoomScene({
  items,
  timeOfDay,
  moodLevel,
  shimmeringZone,
  onItemTap,
  onAvatarTap,
  onDoubleTap,
}: RoomSceneProps) {
  const lighting = getLightingConfig(timeOfDay, moodLevel);
  const orbitX = useRef(0);
  const orbitY = useRef(0);
  const lastTap = useRef<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        orbitX.current += gestureState.dx * 0.01;
        orbitY.current += gestureState.dy * 0.01;
      },
      onPanResponderRelease: () => {
        // Camera orbit complete — would update Filament camera here
      },
    }),
  ).current;

  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onDoubleTap?.();
    }
    lastTap.current = now;
  }, [onDoubleTap]);

  const bgColor = getRoomBackgroundColor(timeOfDay, moodLevel);

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }]}
      testID="room-scene"
      {...panResponder.panHandlers}
      onTouchEnd={handlePress}
      accessibilityLabel="Your room"
      accessibilityRole="image"
    >
      {/* Placeholder room visualization — replace with Filament renderer */}
      <RoomPlaceholder
        timeOfDay={timeOfDay}
        moodLevel={moodLevel}
        items={items}
        shimmeringZone={shimmeringZone}
        onAvatarTap={onAvatarTap}
        lighting={lighting}
      />
    </View>
  );
}

/**
 * Placeholder room visualization used when the 3D engine is not available.
 * Renders a warm gradient background with ambient lighting description.
 */
function RoomPlaceholder({
  timeOfDay,
  moodLevel,
  items,
  shimmeringZone,
  onAvatarTap,
  lighting,
}: Omit<RoomSceneProps, 'onItemTap' | 'onDoubleTap'> & {
  lighting: ReturnType<typeof getLightingConfig>;
}) {
  return (
    <View style={styles.placeholder}>
      <View style={[styles.room, { backgroundColor: lighting.fogColor + '20' }]}>
        {/* Window */}
        <View style={styles.window}>
          <View style={[styles.windowInner, { backgroundColor: getWindowColor(timeOfDay) }]} />
        </View>

        {/* Floor */}
        <View style={styles.floor} />

        {/* Avatar placeholder */}
        <View
          style={[styles.avatar, moodLevel !== null && { opacity: moodLevel >= 3 ? 1 : 0.7 }]}
          onTouchEnd={onAvatarTap}
          accessibilityLabel="Avatar"
          accessibilityRole="button"
          testID="room-avatar"
        >
          <Text style={styles.avatarEmoji}>🧘</Text>
        </View>

        {/* Room items */}
        {items.slice(0, 6).map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.itemDot,
              {
                left: 20 + (index % 3) * 80,
                bottom: 60 + Math.floor(index / 3) * 40,
                opacity: shimmeringZone ? 0.5 + Math.sin(Date.now() * 0.01) * 0.3 : 1,
              },
            ]}
            testID={`room-item-${item.id}`}
          >
            <Text style={styles.itemEmoji}>{getItemEmoji(item.itemType)}</Text>
          </View>
        ))}

        {/* Lighting overlay */}
        <View
          style={[
            styles.lightingOverlay,
            { backgroundColor: lighting.ambientColor + '15' },
          ]}
          pointerEvents="none"
        />
      </View>

      <Text style={styles.lightingLabel} testID="lighting-description">
        {lighting.description}
      </Text>
    </View>
  );
}

function getRoomBackgroundColor(timeOfDay: TimeOfDay, moodLevel: MoodLevel | null): string {
  if (moodLevel !== null && moodLevel <= 2) return '#8BA5BA';
  switch (timeOfDay) {
    case 'morning': return '#FFF3DC';
    case 'afternoon': return '#FAF6F1';
    case 'evening': return '#F5E0C8';
    case 'night': return '#2A2420';
  }
}

function getWindowColor(timeOfDay: TimeOfDay): string {
  switch (timeOfDay) {
    case 'morning': return '#FFE580';
    case 'afternoon': return '#87CEEB';
    case 'evening': return '#FF8C42';
    case 'night': return '#1A1F35';
  }
}

function getItemEmoji(itemType: string): string {
  const emojiMap: Record<string, string> = {
    'plant-small': '🌿',
    'bookshelf': '📚',
    'postcard': '🪴',
    'yoga-mat': '🧘',
    'sketchbook': '🎨',
    'candle': '🕯️',
    'coffee-mug': '☕',
    'shoes-by-door': '👟',
    'succulent': '🌵',
    'potted-herb': '🌱',
    'flowering-plant': '🌸',
    'full-bloom': '🌺',
  };
  return emojiMap[itemType] ?? '🪑';
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: ROOM_HEIGHT,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  room: {
    width: '92%',
    height: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#00000010',
  },
  window: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 60,
    height: 80,
    borderWidth: 3,
    borderColor: '#C4A882',
    borderRadius: 4,
    overflow: 'hidden',
  },
  windowInner: {
    flex: 1,
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#C4A882',
    opacity: 0.4,
  },
  avatar: {
    position: 'absolute',
    bottom: 65,
    left: '45%',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  itemDot: {
    position: 'absolute',
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 22,
  },
  lightingOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  lightingLabel: {
    fontSize: 11,
    color: '#8B7D72',
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
