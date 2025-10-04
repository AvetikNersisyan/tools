import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Import global styles
import './styles/globals.css';
import './styles/layout.css';
import './styles/components.css';

// Set up analytics stub
declare global {
  interface Window {
    trackEvent?: (name: string, payload?: any) => void;
  }
}

window.trackEvent = (name: string, payload?: any) => {
  console.log('[Analytics]', name, payload || {});
  
  // You can extend this to send to actual analytics services
  // Examples:
  // - Google Analytics: gtag('event', name, payload);
  // - Facebook Pixel: fbq('track', name, payload);
  // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ name, payload }) });
};

// Initialize app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Log startup info
console.log('🚀 Shop Tools Landing Page Loaded');
console.log('📊 Analytics tracking enabled (console mode)');
console.log('💾 Data stored in localStorage');
console.log('🔧 Admin panel available in dev mode');

// Welcome message for developers
if (process.env.NODE_ENV === 'development') {
  console.log('%c👋 Welcome Developer!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
  console.log('%cTo access admin features:', 'color: #059669; font-weight: bold;');
  console.log('• Look for [DEV] Admin button in bottom-left corner');
  console.log('• Export leads as CSV');
  console.log('• Clear test data');
  console.log('• View localStorage contents');
  console.log('%cTo customize:', 'color: #dc2626; font-weight: bold;');
  console.log('• Contact info: src/config.ts');
  console.log('• Product data: src/data/sampleData.ts');
  console.log('• Styles: src/styles/');
}