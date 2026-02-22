import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalendarGrid } from '../CalendarGrid';
import type { MoodLevel } from '../../../types';

describe('CalendarGrid', () => {
  const moodByDate = new Map<string, MoodLevel>([
    ['2024-02-05', 3],
    ['2024-02-10', 5],
    ['2024-02-15', 1],
  ]);

  it('renders all days in the month', () => {
    const { getAllByRole } = render(
      <CalendarGrid
        year={2024}
        month={2}
        moodByDate={moodByDate}
      />,
    );
    // Feb 2024 has 29 days (leap year)
    const dayButtons = getAllByRole('button');
    expect(dayButtons).toHaveLength(29);
  });

  it('renders day labels (Mo Tu We ...)', () => {
    const { getByText } = render(
      <CalendarGrid year={2024} month={2} moodByDate={moodByDate} />,
    );
    expect(getByText('Mo')).toBeTruthy();
    expect(getByText('Su')).toBeTruthy();
  });

  it('calls onDayPress with correct date when day pressed', () => {
    const onDayPress = jest.fn();
    const { getByTestId } = render(
      <CalendarGrid
        year={2024}
        month={2}
        moodByDate={moodByDate}
        onDayPress={onDayPress}
      />,
    );
    fireEvent.press(getByTestId('calendar-day-2024-02-10'));
    expect(onDayPress).toHaveBeenCalledWith('2024-02-10');
  });

  it('correctly renders March 2024 with 31 days', () => {
    const { getAllByRole } = render(
      <CalendarGrid year={2024} month={3} moodByDate={new Map()} />,
    );
    expect(getAllByRole('button')).toHaveLength(31);
  });
});
