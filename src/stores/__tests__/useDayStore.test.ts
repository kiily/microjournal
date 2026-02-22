import { useDayStore, selectAllHabitsDone, selectCompletedHabitsCount } from '../useDayStore';
import type { HabitWithProgress } from '../../types';

const mockHabit = (id: string, completed: boolean): HabitWithProgress => ({
  id,
  name: `Habit ${id}`,
  icon: 'activity',
  category: 'move',
  isArchived: false,
  sortOrder: 0,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  totalCompletions: 5,
  tier: 1,
  completedToday: completed,
});

beforeEach(() => {
  useDayStore.setState({
    todayDate: '2024-01-15',
    todayMood: null,
    habits: [],
    isMoodLoading: true,
    isHabitsLoading: true,
  });
});

describe('useDayStore', () => {
  it('updateMoodLevel sets mood level', () => {
    useDayStore.getState().updateMoodLevel(4);
    const state = useDayStore.getState();
    expect(state.todayMood?.moodLevel).toBe(4);
  });

  it('updateMoodTags sets tags', () => {
    useDayStore.getState().updateMoodLevel(3);
    useDayStore.getState().updateMoodTags(['calm', 'grateful']);
    expect(useDayStore.getState().todayMood?.tags).toEqual(['calm', 'grateful']);
  });

  it('toggleHabitCompletion flips the completed state', () => {
    useDayStore.setState({
      habits: [mockHabit('h1', false), mockHabit('h2', true)],
      todayDate: '2024-01-15',
      todayMood: null,
      isMoodLoading: false,
      isHabitsLoading: false,
    });

    useDayStore.getState().toggleHabitCompletion('h1');
    expect(useDayStore.getState().habits[0].completedToday).toBe(true);

    useDayStore.getState().toggleHabitCompletion('h2');
    expect(useDayStore.getState().habits[1].completedToday).toBe(false);
  });
});

describe('selectAllHabitsDone', () => {
  it('returns false when no habits', () => {
    const state = useDayStore.getState();
    expect(selectAllHabitsDone(state)).toBe(false);
  });

  it('returns true when all habits are completed', () => {
    useDayStore.setState({
      habits: [mockHabit('h1', true), mockHabit('h2', true)],
      todayDate: '2024-01-15',
      todayMood: null,
      isMoodLoading: false,
      isHabitsLoading: false,
    });
    expect(selectAllHabitsDone(useDayStore.getState())).toBe(true);
  });

  it('returns false when some habits are incomplete', () => {
    useDayStore.setState({
      habits: [mockHabit('h1', true), mockHabit('h2', false)],
      todayDate: '2024-01-15',
      todayMood: null,
      isMoodLoading: false,
      isHabitsLoading: false,
    });
    expect(selectAllHabitsDone(useDayStore.getState())).toBe(false);
  });
});

describe('selectCompletedHabitsCount', () => {
  it('returns 0 for no completed habits', () => {
    useDayStore.setState({
      habits: [mockHabit('h1', false), mockHabit('h2', false)],
      todayDate: '2024-01-15',
      todayMood: null,
      isMoodLoading: false,
      isHabitsLoading: false,
    });
    expect(selectCompletedHabitsCount(useDayStore.getState())).toBe(0);
  });

  it('returns correct count', () => {
    useDayStore.setState({
      habits: [mockHabit('h1', true), mockHabit('h2', false), mockHabit('h3', true)],
      todayDate: '2024-01-15',
      todayMood: null,
      isMoodLoading: false,
      isHabitsLoading: false,
    });
    expect(selectCompletedHabitsCount(useDayStore.getState())).toBe(2);
  });
});
