# Shop Tools Landing Page

A high-converting lead-capture landing page built with React + TypeScript + Vite. Features fake urgency mechanics, lead capture forms, and local storage persistence.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the landing page.

## 📋 Features

### Core Components
- **Hero Section** - Main headline, countdown timer, and primary CTA
- **Gallery** - Product image carousel with zoom effects
- **Features** - Key benefits and value propositions
- **Reviews** - Customer testimonials with star ratings
- **Comments Feed** - Social proof with real-time comment system
- **Lead Form** - Conversion-optimized contact capture
- **Sticky CTA** - Mobile bottom bar and desktop side panel
- **Footer** - Contact info and trust signals

### Urgency Mechanics
- **Rolling Countdown** - 48-hour timer that resets automatically
- **Stock Counter** - Decreases slowly but never reaches zero
- **Limited Time Badges** - Visual urgency indicators

### Lead Management
- **LocalStorage Persistence** - No backend required
- **CSV Export** - Download leads for external processing
- **Contact Integration** - Automatic tel:/WhatsApp/Telegram links
- **Form Validation** - Real-time error checking

### Developer Features
- **Admin Panel** - View/export/clear leads (dev mode only)
- **Analytics Stub** - Console logging with extensible tracking
- **TypeScript** - Fully typed for reliability
- **Responsive Design** - Mobile-first CSS approach

## ⚙️ Configuration

### Contact Information
Edit `src/config.ts`:

```typescript
export const CONTACT = {
  PHONE: '+1234567890',
  TELEGRAM_USERNAME: 'your_username',
  WHATSAPP_NUMBER: '1234567890',
};
```

### Product Data
Edit `src/data/sampleData.ts` to customize:
- Product title, pricing, and images
- Customer reviews and ratings
- Feature highlights
- Sample comments

### Urgency Settings
Adjust timing in `src/config.ts`:

```typescript
export const OFFER = {
  COUNTDOWN_HOURS: 48,        // Rolling countdown duration
  INITIAL_STOCK: 20,          // Starting stock level
  MIN_STOCK_FLOOR: 6,         // Never goes below this
  DECREMENT_EVERY_MIN: 17,    // Stock decrease interval
};
```

## 🎨 Styling

The project uses plain CSS with a custom design system:

- `src/styles/globals.css` - CSS reset, variables, typography
- `src/styles/layout.css` - Grid system, spacing utilities
- `src/styles/components.css` - Button variants, cards, modals

### CSS Custom Properties
All colors, spacing, and typography use CSS variables for easy customization:

```css
:root {
  --primary-600: #2563eb;
  --success-600: #16a34a;
  --warning-500: #f59e0b;
  /* ... more variables */
}
```

## 📊 Analytics

The app includes a stub analytics system that logs to console:

```typescript
window.trackEvent('event_name', { key: 'value' });
```

**Tracked Events:**
- Page views and section visibility
- CTA clicks and form submissions
- Gallery interactions
- Comment posting
- Admin actions

To integrate real analytics, modify `src/main.tsx`:

```typescript
window.trackEvent = (name: string, payload?: any) => {
  // Google Analytics
  gtag('event', name, payload);
  
  // Facebook Pixel
  fbq('track', name, payload);
  
  // Custom API
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: name, data: payload })
  });
};
```

## 💾 Data Storage

All data is stored in browser localStorage:

- **Leads** - Contact form submissions
- **Comments** - User-generated comments
- **Countdown** - Timer state for persistence
- **Stock** - Fake inventory levels

### Storage Keys
- `shop-tools-leads` - Lead submissions array
- `shop-tools-comments` - Comments array  
- `shop-tools-countdown-start` - Timer start time
- `shop-tools-stock-state` - Inventory state object

### Admin Panel (Development)
Access via `[DEV] Admin` button (bottom-left in dev mode):

- View all captured leads
- Export leads as CSV
- Clear all test data
- Debug storage contents

## 🔄 Backend Integration

To connect a real backend, replace localStorage calls in:

1. **Lead Submission** (`src/components/LeadForm.tsx`):
```typescript
// Replace this:
leadsStorage.append(lead);

// With this:
await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(lead)
});
```

2. **Comments** (`src/components/CommentsFeed.tsx`):
```typescript
// Replace localStorage with API calls
const response = await fetch('/api/comments');
const comments = await response.json();
```

3. **Admin Panel** (`src/components/AdminPanel.tsx`):
```typescript
// Fetch from API instead of localStorage
const response = await fetch('/api/admin/leads');
const leads = await response.json();
```

## 📱 Mobile Optimization

- **Responsive Design** - Mobile-first CSS approach
- **Touch Friendly** - Large tap targets, swipe gestures
- **Fast Loading** - Optimized images and code splitting
- **Sticky CTA** - Bottom bar for mobile conversion

## 🔒 Security & Privacy

- **No External Dependencies** - Self-contained styling and logic
- **Local Storage Only** - No data sent to external services
- **Privacy Compliant** - Clear notices about data usage
- **XSS Protection** - Sanitized user inputs

## 🎯 Conversion Optimization

### Psychological Triggers
- **Scarcity** - Limited stock counters
- **Urgency** - Countdown timers and limited offers
- **Social Proof** - Customer reviews and recent comments
- **Authority** - Professional grade messaging
- **Trust** - Warranties, guarantees, secure badges

### A/B Testing Ready
Easy to test variations:
- Modify `src/config.ts` for different offers
- Update `src/data/sampleData.ts` for messaging tests
- CSS variables for design variations
- Component props for feature toggles

## 🚢 Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Upload ./dist to Netlify, Vercel, GitHub Pages, etc.
```

### Docker
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

### Custom Server
```bash
# Build static files
npm run build

# Serve with any static file server
npx serve dist
python -m http.server -d dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues** - Report bugs via GitHub Issues
- **Documentation** - Check component JSDoc comments
- **Examples** - See `src/data/sampleData.ts` for data formats

---

Built with ❤️ using React, TypeScript, and Vite.