import { useAppStore } from '../useAppStore';
import type { UserProfile } from '../../types';

const mockProfile: UserProfile = {
  id: 'test-id',
  displayName: 'Maya',
  avatarConfig: {},
  roomTier: 1,
  onboarded: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

beforeEach(() => {
  useAppStore.getState().reset();
});

describe('useAppStore', () => {
  it('starts with no profile and loading true', () => {
    const state = useAppStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isLoading).toBe(true);
    expect(state.isOnboarded).toBe(false);
  });

  it('sets profile correctly', () => {
    useAppStore.getState().setProfile(mockProfile);
    const state = useAppStore.getState();
    expect(state.profile).toEqual(mockProfile);
    expect(state.isLoading).toBe(false);
    expect(state.isOnboarded).toBe(false);
  });

  it('marks isOnboarded true when profile is onboarded', () => {
    const onboardedProfile = { ...mockProfile, onboarded: true };
    useAppStore.getState().setProfile(onboardedProfile);
    expect(useAppStore.getState().isOnboarded).toBe(true);
  });

  it('updateDisplayName updates the profile name', () => {
    useAppStore.getState().setProfile(mockProfile);
    useAppStore.getState().updateDisplayName('Alex');
    expect(useAppStore.getState().profile?.displayName).toBe('Alex');
  });

  it('completeOnboarding sets isOnboarded to true', () => {
    useAppStore.getState().setProfile(mockProfile);
    useAppStore.getState().completeOnboarding();
    expect(useAppStore.getState().isOnboarded).toBe(true);
    expect(useAppStore.getState().profile?.onboarded).toBe(true);
  });

  it('setRoomTier updates room tier in profile', () => {
    useAppStore.getState().setProfile(mockProfile);
    useAppStore.getState().setRoomTier(2);
    expect(useAppStore.getState().profile?.roomTier).toBe(2);
  });

  it('reset clears all state', () => {
    useAppStore.getState().setProfile(mockProfile);
    useAppStore.getState().reset();
    const state = useAppStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isLoading).toBe(true);
  });
});
