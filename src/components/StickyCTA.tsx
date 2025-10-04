import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { PRODUCT } from '../data/sampleData';

/**
 * StickyCTA component props
 */
interface StickyCTAProps {
  onOpenLeadModal: () => void;
  className?: string;
}

/**
 * Sticky CTA component that shows on mobile (bottom) and desktop (right side)
 */
export const StickyCTA: React.FC<StickyCTAProps> = ({ onOpenLeadModal, className = '' }) => {
  const countdown = useCountdown();

  const handleClick = () => {
    if (window.trackEvent) {
      window.trackEvent('sticky_cta_click', {
        countdown_remaining: countdown.timeLeft,
        location: window.innerWidth < 768 ? 'mobile_bottom' : 'desktop_side',
      });
    }
    onOpenLeadModal();
  };

  return (
    <>
      {/* Mobile sticky CTA (bottom) */}
      <div className={`sticky-cta sticky-cta-mobile md:hidden bg-gradient-to-r from-primary-600 to-primary-700 border-0 ${className}`}>
        <div className="flex items-center gap-3 min-w-0">
          {/* Price info with better styling */}
          <div className="flex-shrink-0 bg-white rounded-lg px-3 py-2 shadow-lg">
            <div className="text-lg font-black text-primary-600 leading-none">
              {PRODUCT.price.toLocaleString()} ֏
            </div>
            <div className="text-xs text-gray-500 line-through">
              {PRODUCT.originalPrice.toLocaleString()} ֏
            </div>
          </div>

          {/* Countdown with urgency */}
          <div className="flex-1 min-w-0 text-white">
            <div className="text-xs opacity-90 mb-1">🔥 Ակցիան ավարտվում է:</div>
            <div className="text-sm font-bold font-mono bg-white/20 rounded px-2 py-1 inline-block">
              {countdown.timeLeft}
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <button
            onClick={handleClick}
            className="btn bg-warning-500 hover:bg-warning-600 text-white border-0 font-bold px-6 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 flex-shrink-0"
          >
            <span className="text-lg mr-1">📞</span>
            Պատվիրել
          </button>
        </div>
        
        {/* Pulsing indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-400 rounded-full animate-ping"></div>
      </div>

      {/* Desktop sticky CTA (right side) */}
      <div className={`sticky-cta sticky-cta-desktop hidden md:block ${className}`}>
        <div className="text-center">
          {/* Urgency indicator */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-warning-700">Limited Time</span>
          </div>

          {/* Product info */}
          <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
            {PRODUCT.title}
          </h3>

          {/* Price display */}
          <div className="mb-4">
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-2xl font-bold text-primary-600">
                {PRODUCT.price.toLocaleString()} ֏
              </span>
              <span className="text-sm text-secondary line-through">
                {PRODUCT.originalPrice.toLocaleString()} ֏
              </span>
            </div>
            <div className="text-xs text-success-600 font-medium">
              Խնայել {(PRODUCT.originalPrice - PRODUCT.price).toLocaleString()} ֏
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-secondary mb-1">⏰ Առաջարկը ավարտվում է:</div>
            <div className="text-lg font-bold text-warning-600 font-mono">
              {countdown.timeLeft}
            </div>
          </div>

          {/* Benefits */}
          <div className="text-xs text-secondary space-y-1 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-success-500">✓</span>
              <span>Անվճար առաքում</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-success-500">✓</span>
              <span>Երաշխիք</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-success-500">✓</span>
              <span>30 օրվա երաշխիք</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="btn btn-primary w-full mb-3 font-semibold"
          >
            <span className="mr-2">📞</span>
            Անմիջապես պատվիրել
          </button>

          {/* Secondary info */}
          <div className="text-xs text-secondary">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-success-500">🔒</span>
              <span>100% Անվտանգ</span>
            </div>
            <div>Պարտավորություն չի պահանջվում</div>
          </div>

          {/* Floating animation effect */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-500 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
    </>
  );
};