import {
  getZonePosition,
  getDefaultPlacement,
  getFocusPlantPlacement,
  hasAvailableSlot,
  getRoomCapacity,
} from '../placement';

describe('getZonePosition', () => {
  it('returns a position object for each category', () => {
    const categories = ['body', 'mind', 'connect', 'move', 'create', 'rest'] as const;
    categories.forEach((cat) => {
      const pos = getZonePosition(cat);
      expect(pos).toHaveProperty('x');
      expect(pos).toHaveProperty('y');
      expect(pos).toHaveProperty('z');
    });
  });

  it('applies slot offset for non-zero slot index', () => {
    const pos0 = getZonePosition('body', 0);
    const pos1 = getZonePosition('body', 1);
    // Slot 1 should be different from slot 0
    expect(pos1.x !== pos0.x || pos1.z !== pos0.z).toBe(true);
  });
});

describe('getDefaultPlacement', () => {
  it('returns valid placement object', () => {
    const placement = getDefaultPlacement('mind');
    expect(placement.position).toBeDefined();
    expect(placement.rotation).toBeDefined();
    expect(placement.scale).toBe(1.0);
  });
});

describe('getFocusPlantPlacement', () => {
  it('increments x position for each plant', () => {
    const pos0 = getFocusPlantPlacement(0);
    const pos1 = getFocusPlantPlacement(1);
    expect(pos1.position.x).toBeGreaterThan(pos0.position.x);
  });

  it('places plants above ground (y > 0)', () => {
    const pos = getFocusPlantPlacement(0);
    expect(pos.position.y).toBeGreaterThan(0);
  });
});

describe('hasAvailableSlot', () => {
  it('returns true when under max', () => {
    expect(hasAvailableSlot('body', 2)).toBe(true);
  });

  it('returns false when at max', () => {
    expect(hasAvailableSlot('body', 3)).toBe(false);
  });

  it('respects custom maxSlots', () => {
    expect(hasAvailableSlot('mind', 5, 6)).toBe(true);
    expect(hasAvailableSlot('mind', 6, 6)).toBe(false);
  });
});

describe('getRoomCapacity', () => {
  it('returns 6 for tier 1 (Studio)', () => {
    expect(getRoomCapacity(1)).toBe(6);
  });

  it('returns 9 for tier 2 (One-Bed)', () => {
    expect(getRoomCapacity(2)).toBe(9);
  });

  it('returns 12 for tier 3 (Loft)', () => {
    expect(getRoomCapacity(3)).toBe(12);
  });

  it('returns 18 for tier 4 (Penthouse)', () => {
    expect(getRoomCapacity(4)).toBe(18);
  });
});
