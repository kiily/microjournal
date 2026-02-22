import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type SnapPoint = 'collapsed' | 'peeking' | 'expanded';

interface BottomSheetProps {
  snapPoint: SnapPoint;
  onSnapPointChange?: (point: SnapPoint) => void;
  children: React.ReactNode;
  peekHeight?: number;
  expandedHeight?: number;
}

const PEEK_HEIGHT = 220;
const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.75;
const COLLAPSED_HEIGHT = 50; // Just the drag handle visible

function getYForSnapPoint(snapPoint: SnapPoint, peekHeight: number, expandedHeight: number): number {
  switch (snapPoint) {
    case 'collapsed':
      return SCREEN_HEIGHT - COLLAPSED_HEIGHT;
    case 'peeking':
      return SCREEN_HEIGHT - peekHeight;
    case 'expanded':
      return SCREEN_HEIGHT - expandedHeight;
  }
}

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.8,
};

export function BottomSheet({
  snapPoint,
  onSnapPointChange,
  children,
  peekHeight = PEEK_HEIGHT,
  expandedHeight = EXPANDED_HEIGHT,
}: BottomSheetProps) {
  const translateY = useSharedValue(getYForSnapPoint(snapPoint, peekHeight, expandedHeight));
  const lastSnapPoint = useRef<SnapPoint>(snapPoint);

  useEffect(() => {
    const targetY = getYForSnapPoint(snapPoint, peekHeight, expandedHeight);
    translateY.value = withSpring(targetY, SPRING_CONFIG);
    lastSnapPoint.current = snapPoint;
  }, [snapPoint, peekHeight, expandedHeight, translateY]);

  const onSnapChange = useCallback(
    (point: SnapPoint) => {
      onSnapPointChange?.(point);
    },
    [onSnapPointChange],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        const currentY = getYForSnapPoint(lastSnapPoint.current, peekHeight, expandedHeight);
        const newY = currentY + gestureState.dy;
        const minY = getYForSnapPoint('expanded', peekHeight, expandedHeight);
        const maxY = getYForSnapPoint('collapsed', peekHeight, expandedHeight);
        translateY.value = Math.max(minY, Math.min(maxY, newY));
      },
      onPanResponderRelease: (_, gestureState) => {
        const { vy, dy } = gestureState;
        let nextSnap: SnapPoint;

        if (vy > 0.5 || dy > 80) {
          // Swiping down
          if (lastSnapPoint.current === 'expanded') {
            nextSnap = 'peeking';
          } else {
            nextSnap = 'collapsed';
          }
        } else if (vy < -0.5 || dy < -80) {
          // Swiping up
          if (lastSnapPoint.current === 'collapsed') {
            nextSnap = 'peeking';
          } else {
            nextSnap = 'expanded';
          }
        } else {
          nextSnap = lastSnapPoint.current;
        }

        lastSnapPoint.current = nextSnap;
        const targetY = getYForSnapPoint(nextSnap, peekHeight, expandedHeight);
        translateY.value = withSpring(targetY, SPRING_CONFIG);
        runOnJS(onSnapChange)(nextSnap);
      },
    }),
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [getYForSnapPoint('expanded', peekHeight, expandedHeight), getYForSnapPoint('peeking', peekHeight, expandedHeight)],
      [0.4, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, styles.backdrop, backdropOpacity]}
        pointerEvents="none"
      />
      <Animated.View
        style={[styles.sheet, animatedStyle]}
        testID="bottom-sheet"
      >
        <View {...panResponder.panHandlers} style={styles.dragHandleArea}>
          <View style={styles.dragHandle} testID="drag-handle" />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#2C2420',
    zIndex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#F5EDE4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  dragHandleArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#B8ADA4',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
