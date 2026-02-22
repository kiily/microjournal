import { useState, useEffect } from 'react';
import type { TimeOfDay } from '../types';
import { getCurrentTimeOfDay } from '../lib/dates';

/**
 * Returns the current time-of-day bracket, updating every minute.
 */
export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => getCurrentTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getCurrentTimeOfDay());
    }, 60_000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
}
