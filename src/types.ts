/**
 * Lead capture data structure
 */
export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferred_contact: 'phone' | 'telegram' | 'whatsapp';
  note?: string;
  created_at: string; // ISO string
};

/**
 * Product review structure
 */
export type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // ISO string
};

/**
 * Comment/feedback structure
 */
export type Comment = {
  id: string;
  name: string;
  text: string;
  date: string; // ISO string
};

/**
 * Product data structure
 */
export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  images: string[];
  sku: string;
  description?: string;
  currency?: string;
  badges?: string[];
  initialStock?: number;
};

/**
 * Feature/benefit structure
 */
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG content or icon name
};

/**
 * Contact method enum
 */
export type ContactMethod = 'phone' | 'telegram' | 'whatsapp';

/**
 * Urgency mechanics state
 */
export type UrgencyState = {
  countdownStart: string; // ISO string
  stock: {
    initial: number;
    current: number;
    lastTickAt: string; // ISO string
  };
};

/**
 * Form validation errors
 */
export type ValidationErrors = {
  [key: string]: string | undefined;
};

/**
 * Global window extensions
 */
declare global {
  interface Window {
    trackEvent?: (name: string, payload?: any) => void;
  }
}