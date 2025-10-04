import React from 'react';
import { PRODUCT } from '../data/sampleData';
import { useCountdown } from '../hooks/useCountdown';
import { PriceBadge } from './PriceBadge';

/**
 * Hero component props
 */
interface HeroProps {
  onOpenLeadModal: () => void;
  className?: string;
}

/**
 * Hero section with headline, countdown, CTA and price badge
 */
export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, className = '' }) => {
  const countdown = useCountdown();

  const handleCtaClick = () => {
    if (window.trackEvent) {
      window.trackEvent('hero_cta_click', {
        location: 'hero',
        countdown_remaining: countdown.timeLeft,
      });
    }
    onOpenLeadModal();
  };

  return (
    <section className={`section bg-gradient-primary text-white ${className}`}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left">
            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <div className="badge bg-white text-primary-600 font-semibold">
                <span className="mr-1">⚡</span>
                Սահմանափակ առաջարկ
              </div>
              <div className="badge bg-success-500 text-white font-semibold">
                <span className="mr-1">🚚</span>
                Անվճար առաքում
              </div>
              <div className="badge bg-warning-500 text-white font-semibold">
                <span className="mr-1">⭐</span>
                #1 Մասնագիտական ընտրություն
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-white mb-6 leading-tight">
              {PRODUCT.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              {PRODUCT.subtitle}
            </p>

            {/* Key benefits */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-3 text-primary-100">
                <span className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span>Մասնագիտական որակ</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <span className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span>Երաշխիք</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <span className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span>10,000+ գոհ հաճախորդներ</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100">
                <span className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span>30 օրվա գումարի վերադարձ</span>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="text-center">
                <p className="text-primary-100 text-sm mb-2 font-medium">
                  🔥 Հատուկ առաջարկը ավարտվում է:
                </p>
                <div className="text-4xl font-bold text-white mb-2 font-mono tracking-wider">
                  {countdown.timeLeft}
                </div>
                <p className="text-primary-200 text-xs">
                  Ժամ : Րոպե : Վայրկյան
                </p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="text-center lg:text-left">
              <button
                onClick={handleCtaClick}
                className="btn btn-lg bg-white text-primary-600 hover:bg-primary-50 font-bold px-12 py-4 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">📞</span>
                Անմիջապես պատվիրել
              </button>
              <p className="text-primary-200 text-sm mt-3">
                Պարտավորություն չկա • Անվճար խորհրդատվություն • Անմիջական պատասխան
              </p>
            </div>
          </div>

          {/* Right column - Price badge */}
          <div className="flex justify-center lg:justify-end">
            <PriceBadge
              currentPrice={PRODUCT.price}
              originalPrice={PRODUCT.originalPrice}
              className="max-w-sm w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};