import React from 'react';
import { APP_CONFIG, CONTACT } from '../config';
import { getCurrentISOString } from '../utils/time';

/**
 * Footer component props
 */
interface FooterProps {
  className?: string;
}

/**
 * Footer component with contact info and legal notices
 */
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('footer_view', {
        timestamp: getCurrentISOString(),
      });
    }
  }, []);

  const handleContactClick = (method: string, value: string) => {
    if (window.trackEvent) {
      window.trackEvent('footer_contact_click', {
        method,
        value,
      });
    }
  };

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold">
                ST
              </div>
              <h3 className="text-xl font-bold">{APP_CONFIG.name}</h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {APP_CONFIG.description}. We provide premium-grade tools trusted by over 10,000 
              professionals worldwide. Quality, durability, and precision are our top priorities.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-success-400">⭐</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-success-400">✓</span>
                <span>10,000+ Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Կապ մեզ հետ</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <a
                  href={`tel:${CONTACT.PHONE}`}
                  onClick={() => handleContactClick('phone', CONTACT.PHONE)}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {CONTACT.PHONE}
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Telegram</p>
                <a
                  href={`https://t.me/${CONTACT.TELEGRAM_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick('telegram', CONTACT.TELEGRAM_USERNAME)}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  @{CONTACT.TELEGRAM_USERNAME}
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleContactClick('whatsapp', CONTACT.WHATSAPP_NUMBER)}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  +{CONTACT.WHATSAPP_NUMBER}
                </a>
              </div>
            </div>

            {/* Response time indicator */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-success-400 font-medium">Սովորաբար պատասխանում ենք 1 ժամվա ընթացքում</span>
              </div>
            </div>
          </div>

          {/* Quick links and guarantees */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Մեր խոստումը</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-success-400">✓</span>
                <span>Երաշխիք</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success-400">✓</span>
                <span>30 օրվա գումարի վերադարձ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success-400">✓</span>
                <span>Անվճար առաքում</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success-400">✓</span>
                <span>Մասնագիտական որակ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success-400">✓</span>
                <span>Մասնագիտական օգնություն</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Վստահելի և անվտանգ</p>
              <div className="flex gap-2">
                <div className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                  🔒 SSL Secured
                </div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                  ✓ Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </div>

            {/* Privacy notice */}
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p className="flex items-center gap-1">
                <span className="text-success-400">🛡️</span>
                Մենք հարգում ենք ձեր գաղտնիությունը և կապվում ենք միայն ձեր պատվերի հարցով։
              </p>
            </div>
          </div>

          {/* Additional legal/compliance info */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>
                Professional tools for professional results. All products come with comprehensive warranties and customer support.
              </p>
              <p>
                By contacting us, you agree to receive communications about our products and services. 
                You can opt out at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};