/**
 * Contact configuration for lead generation
 */
export const CONTACT = {
  PHONE: '+37499752599',
  TELEGRAM_USERNAME: 'AvetikN',
  WHATSAPP_NUMBER: '37499752599',
};

/**
 * Offer configuration for urgency mechanics
 */
export const OFFER = {
  // Rolling 48h timer from first visit; store in localStorage
  COUNTDOWN_HOURS: 48,
  // Initial stock that slowly decreases but never reaches 0
  INITIAL_STOCK: 20,
  MIN_STOCK_FLOOR: 6, // Never go below this
  DECREMENT_EVERY_MIN: 17, // Pseudo-randomized around this
};

/**
 * Generate templated contact messages
 */
export const generateContactMessage = (userName: string, productName: string = 'Premium Tool Set') => {
  const baseMessage = `Hi! I'm interested in the ${productName}. My name is ${userName}. Please contact me about this offer.`;
  return encodeURIComponent(baseMessage);
};

/**
 * Contact URLs generator
 */
export const getContactUrls = (userName: string, productName?: string) => {
  const message = generateContactMessage(userName, productName);
  
  return {
    phone: `tel:${CONTACT.PHONE}`,
    telegram: `https://t.me/${CONTACT.TELEGRAM_USERNAME}?text=${message}`,
    whatsapp: `https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${message}`,
  };
};

/**
 * Application metadata
 */
export const APP_CONFIG = {
  name: 'Shop Tools',
  description: 'Premium tools for professionals',
  version: '1.0.0',
  author: 'Shop Tools Team',
};