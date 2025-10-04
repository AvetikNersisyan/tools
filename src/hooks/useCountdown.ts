import { useState, useEffect } from 'react';
import { OFFER } from '../config';
import { countdownStorage } from '../utils/storage';
import { addHours, getCurrentISOString, millisecondsToHMS } from '../utils/time';

/**
 * Countdown hook return type
 */
export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isExpired: boolean;
  timeLeft: string; // Formatted string "HH:MM:SS"
}

/**
 * Rolling countdown hook that maintains urgency
 * 
 * Features:
 * - Persists countdown start time in localStorage
 * - Automatically resets when expired to maintain urgency
 * - Updates every second
 * - Returns formatted time display
 */
export const useCountdown = (): CountdownState => {
  const [countdown, setCountdown] = useState<CountdownState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isExpired: false,
    timeLeft: '00:00:00',
  });

  useEffect(() => {
    // Initialize countdown start time if not set
    let countdownStart = countdownStorage.get();
    
    if (!countdownStart) {
      countdownStart = getCurrentISOString();
      countdownStorage.set(countdownStart);
    }

    const updateCountdown = () => {
      const now = new Date();
      const startTime = new Date(countdownStart!);
      const endTime = addHours(startTime, OFFER.COUNTDOWN_HOURS);
      const remainingMs = endTime.getTime() - now.getTime();

      // If expired, reset the countdown for continuous urgency
      if (remainingMs <= 0) {
        const newStart = getCurrentISOString();
        countdownStorage.set(newStart);
        
        // Calculate new end time
        const newEndTime = addHours(new Date(newStart), OFFER.COUNTDOWN_HOURS);
        const newRemainingMs = newEndTime.getTime() - now.getTime();
        
        const { hours, minutes, seconds } = millisecondsToHMS(Math.max(0, newRemainingMs));
        const timeLeft = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0'),
        ].join(':');

        setCountdown({
          hours,
          minutes,
          seconds,
          totalMs: Math.max(0, newRemainingMs),
          isExpired: false,
          timeLeft,
        });
        
        return;
      }

      // Normal countdown update
      const { hours, minutes, seconds } = millisecondsToHMS(remainingMs);
      const timeLeft = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':');

      setCountdown({
        hours,
        minutes,
        seconds,
        totalMs: remainingMs,
        isExpired: false,
        timeLeft,
      });
    };

    // Initial update
    updateCountdown();

    // Set up interval to update every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return countdown;
};

/**
 * Hook to check if this is a first-time visitor
 * (based on whether countdown has been initialized)
 */
export const useIsFirstVisit = (): boolean => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const countdownStart = countdownStorage.get();
    setIsFirstVisit(!countdownStart);
  }, []);

  return isFirstVisit;
};

/**
 * Hook to get countdown progress as percentage (0-100)
 * Useful for progress bars or visual indicators
 */
export const useCountdownProgress = (): number => {
  const countdown = useCountdown();
  const totalCountdownMs = OFFER.COUNTDOWN_HOURS * 60 * 60 * 1000;
  
  if (countdown.totalMs <= 0) return 0;
  if (countdown.totalMs >= totalCountdownMs) return 100;
  
  return Math.round((countdown.totalMs / totalCountdownMs) * 100);
};