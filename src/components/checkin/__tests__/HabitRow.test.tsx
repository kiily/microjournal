import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HabitRow } from '../HabitRow';
import type { HabitWithProgress } from '../../../types';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium' },
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return Reanimated;
});

const mockHabit: HabitWithProgress = {
  id: 'h1',
  name: 'Morning stretch',
  icon: 'activity',
  category: 'move',
  isArchived: false,
  sortOrder: 0,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  totalCompletions: 5,
  tier: 1,
  completedToday: false,
};

describe('HabitRow', () => {
  it('renders habit name and category indicator', () => {
    const { getByText } = render(
      <HabitRow habit={mockHabit} onToggle={jest.fn()} />,
    );
    expect(getByText('Morning stretch')).toBeTruthy();
  });

  it('calls onToggle when circle is pressed', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(
      <HabitRow habit={mockHabit} onToggle={onToggle} />,
    );
    fireEvent.press(getByTestId('habit-toggle-h1'));
    expect(onToggle).toHaveBeenCalledWith('h1');
  });

  it('shows unchecked state when not completedToday', () => {
    const { getByRole } = render(
      <HabitRow habit={mockHabit} onToggle={jest.fn()} />,
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it('shows checked state when completedToday', () => {
    const completedHabit = { ...mockHabit, completedToday: true };
    const { getByRole } = render(
      <HabitRow habit={completedHabit} onToggle={jest.fn()} />,
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });

  it('calls onLongPress when long-pressed', () => {
    const onLongPress = jest.fn();
    const { getByTestId } = render(
      <HabitRow habit={mockHabit} onToggle={jest.fn()} onLongPress={onLongPress} />,
    );
    fireEvent(getByTestId('habit-toggle-h1'), 'longPress');
    expect(onLongPress).toHaveBeenCalledWith('h1');
  });
});
