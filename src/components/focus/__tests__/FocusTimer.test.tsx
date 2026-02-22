import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FocusTimer } from '../FocusTimer';
import { useFocusStore } from '../../../stores/useFocusStore';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return Reanimated;
});

// Reset store before each test
beforeEach(() => {
  useFocusStore.setState({
    targetDuration: 25,
    ambientSound: null,
    blockedApps: [],
    sessionId: null,
    status: 'idle',
    startedAt: null,
    elapsedSeconds: 0,
    sessions: [],
  });
});

describe('FocusTimer', () => {
  it('renders the timer display', () => {
    const { getByTestId } = render(
      <FocusTimer onBegin={jest.fn()} onCancel={jest.fn()} />,
    );
    expect(getByTestId('timer-display')).toBeTruthy();
  });

  it('shows 25:00 as default timer for 25 min preset', () => {
    const { getByTestId } = render(
      <FocusTimer onBegin={jest.fn()} onCancel={jest.fn()} />,
    );
    expect(getByTestId('timer-display').props.children).toBe('25:00');
  });

  it('renders preset buttons', () => {
    const { getByTestId } = render(
      <FocusTimer onBegin={jest.fn()} onCancel={jest.fn()} />,
    );
    expect(getByTestId('preset-15')).toBeTruthy();
    expect(getByTestId('preset-25')).toBeTruthy();
    expect(getByTestId('preset-45')).toBeTruthy();
    expect(getByTestId('preset-60')).toBeTruthy();
  });

  it('calls onBegin when Begin is pressed', () => {
    const onBegin = jest.fn();
    const { getByTestId } = render(
      <FocusTimer onBegin={onBegin} onCancel={jest.fn()} />,
    );
    fireEvent.press(getByTestId('focus-begin-button'));
    expect(onBegin).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel is pressed', () => {
    const onCancel = jest.fn();
    const { getByTestId } = render(
      <FocusTimer onBegin={jest.fn()} onCancel={onCancel} />,
    );
    fireEvent.press(getByTestId('focus-cancel-button'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('updates timer display when preset is changed', () => {
    const { getByTestId } = render(
      <FocusTimer onBegin={jest.fn()} onCancel={jest.fn()} />,
    );
    fireEvent.press(getByTestId('preset-45'));
    expect(getByTestId('timer-display').props.children).toBe('45:00');
  });
});
