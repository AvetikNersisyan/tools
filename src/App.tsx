import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Features } from './components/Features';
import { Reviews } from './components/Reviews';
import { CommentsFeed } from './components/CommentsFeed';
import { LeadForm } from './components/LeadForm';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

/**
 * Main App component
 */
function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const openLeadModal = () => {
    setIsLeadModalOpen(true);
    
    // Track modal open event
    if (window.trackEvent) {
      window.trackEvent('lead_modal_opened', {
        timestamp: new Date().toISOString(),
      });
    }
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  // Track page view on mount
  React.useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('page_view', {
        page: 'landing',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
      });
    }
  }, []);

  return (
    <div className="App">
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero onOpenLeadModal={openLeadModal} />

        {/* Gallery Section */}
        <Gallery />

        {/* Features Section */}
        <Features />

        {/* Reviews Section */}
        <Reviews />

        {/* Comments Feed Section */}
        <CommentsFeed />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <StickyCTA onOpenLeadModal={openLeadModal} />

      {/* Lead Capture Modal */}
      <LeadForm
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
      />

      {/* Admin Panel (dev mode only) */}
      <AdminPanel />
    </div>
  );
}

export default App;