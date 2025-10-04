/**
 * Format a date/time to "time ago" format
 */
export const timeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) {
      return 'just now';
    }

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return 'unknown';
  }
};

/**
 * Format date for display (e.g., "Oct 5, 2024")
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return 'Invalid date';
  }
};

/**
 * Format date and time for display (e.g., "Oct 5, 2024 at 2:30 PM")
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return 'Invalid date';
  }
};

/**
 * Get current ISO string
 */
export const getCurrentISOString = (): string => {
  return new Date().toISOString();
};

/**
 * Add hours to a date
 */
export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

/**
 * Add minutes to a date
 */
export const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

/**
 * Check if a date is in the past
 */
export const isInPast = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    return date.getTime() < Date.now();
  } catch (error) {
    return false;
  }
};

/**
 * Check if a date is in the future
 */
export const isInFuture = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    return date.getTime() > Date.now();
  } catch (error) {
    return false;
  }
};

/**
 * Get time difference in milliseconds
 */
export const getTimeDifference = (startDate: string, endDate: string): number => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end.getTime() - start.getTime();
  } catch (error) {
    return 0;
  }
};

/**
 * Convert milliseconds to hours, minutes, seconds
 */
export const millisecondsToHMS = (ms: number): { hours: number; minutes: number; seconds: number } => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

/**
 * Format countdown timer display
 */
export const formatCountdown = (totalMs: number): string => {
  if (totalMs <= 0) {
    return '00:00:00';
  }

  const { hours, minutes, seconds } = millisecondsToHMS(totalMs);
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

/**
 * Get a deterministic pseudo-random number based on date
 * Used for consistent jitter in stock decrements
 */
export const getDeterministicRandom = (seed: string = new Date().toDateString()): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
};

/**
 * Sleep utility for async operations
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};