import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MoodPicker } from '../MoodPicker';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

describe('MoodPicker', () => {
  it('renders 5 mood options', () => {
    const { getAllByRole } = render(
      <MoodPicker selectedLevel={null} onSelect={jest.fn()} />,
    );
    // Each option has accessibilityRole="radio"
    expect(getAllByRole('radio')).toHaveLength(5);
  });

  it('calls onSelect with correct level when tapped', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <MoodPicker selectedLevel={null} onSelect={onSelect} />,
    );

    fireEvent.press(getByTestId('mood-option-3'));
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it('shows correct selected state', () => {
    const { getByTestId } = render(
      <MoodPicker selectedLevel={4} onSelect={jest.fn()} />,
    );

    const selected = getByTestId('mood-option-4');
    expect(selected.props.accessibilityState?.checked).toBe(true);
  });

  it('renders the mood prompt text', () => {
    const { getByText } = render(
      <MoodPicker selectedLevel={null} onSelect={jest.fn()} />,
    );
    expect(getByText("How's today feeling?")).toBeTruthy();
  });

  it('has correct accessibility roles', () => {
    const { getAllByRole } = render(
      <MoodPicker selectedLevel={null} onSelect={jest.fn()} />,
    );
    const options = getAllByRole('radio');
    expect(options).toHaveLength(5);
  });
});
