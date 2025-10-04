import { Lead, Comment } from '../types';

/**
 * localStorage keys for the application
 */
const STORAGE_KEYS = {
  LEADS: 'shop-tools-leads',
  COMMENTS: 'shop-tools-comments',
  COUNTDOWN_START: 'shop-tools-countdown-start',
  STOCK_STATE: 'shop-tools-stock-state',
} as const;

/**
 * Generic localStorage helper with type safety
 */
class Storage<T> {
  constructor(private key: string) {}

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Failed to parse localStorage item ${this.key}:`, error);
      return null;
    }
  }

  set(value: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set localStorage item ${this.key}:`, error);
    }
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }

  clear(): void {
    this.remove();
  }
}

/**
 * Array-based localStorage helper
 */
class ArrayStorage<T> extends Storage<T[]> {
  getArray(): T[] {
    return this.get() || [];
  }

  append(item: T): void {
    const items = this.getArray();
    items.push(item);
    this.set(items);
  }

  prepend(item: T): void {
    const items = this.getArray();
    items.unshift(item);
    this.set(items);
  }

  update(predicate: (item: T) => boolean, updater: (item: T) => T): void {
    const items = this.getArray();
    const index = items.findIndex(predicate);
    if (index >= 0) {
      items[index] = updater(items[index]);
      this.set(items);
    }
  }

  removeItem(predicate: (item: T) => boolean): void {
    const items = this.getArray();
    const filtered = items.filter(item => !predicate(item));
    this.set(filtered);
  }

  count(): number {
    return this.getArray().length;
  }
}

/**
 * Leads storage
 */
export const leadsStorage = new ArrayStorage<Lead>(STORAGE_KEYS.LEADS);

/**
 * Comments storage
 */
export const commentsStorage = new ArrayStorage<Comment>(STORAGE_KEYS.COMMENTS);

/**
 * Countdown start time storage
 */
export const countdownStorage = new Storage<string>(STORAGE_KEYS.COUNTDOWN_START);

/**
 * Stock state storage
 */
export const stockStorage = new Storage<{
  initial: number;
  current: number;
  lastTickAt: string;
}>(STORAGE_KEYS.STOCK_STATE);

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get all storage data (for admin/debug purposes)
 */
export const getAllStorageData = () => {
  return {
    leads: leadsStorage.getArray(),
    comments: commentsStorage.getArray(),
    countdownStart: countdownStorage.get(),
    stockState: stockStorage.get(),
  };
};

/**
 * Clear all application data
 */
export const clearAllData = (): void => {
  leadsStorage.clear();
  commentsStorage.clear();
  countdownStorage.clear();
  stockStorage.clear();
};

/**
 * Export storage data as JSON string
 */
export const exportStorageData = (): string => {
  return JSON.stringify(getAllStorageData(), null, 2);
};