import React from 'react';
import { FEATURES } from '../data/sampleData';

/**
 * Features component props
 */
interface FeaturesProps {
  className?: string;
}

/**
 * SVG icons for features
 */
const FeatureIcons: Record<string, React.ReactNode> = {
  'premium-materials': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'warranty': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'ergonomic': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5z" />
    </svg>
  ),
  'professional': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'precision': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  'shipping': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
};

/**
 * Features section showcasing key benefits
 */
export const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  React.useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('features_section_view', {
        features_count: FEATURES.length,
      });
    }
  }, []);

  return (
    <section className={`section bg-gray-50 ${className}`}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4">Ինչու՞ ընտրել մեր դրիլը</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Մեր դրիլի յուրաքանչյուր առանձնահատկություն մանրակրկիտ նախագծված և փորձարկված է 
            մասնագետների կողմից՝ ապահովելու լավագույն կատարողականը, ամրությունը և արժեքը ձեր ներդրման համար։
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="card hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="card-body text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {FeatureIcons[feature.icon] || FeatureIcons['premium-materials']}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-secondary leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature number (subtle design element) */}
                {/*<div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs font-medium group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors duration-300">*/}
                {/*  {String(index + 1).padStart(2, '0')}*/}
                {/*</div>*/}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border inline-block">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-success-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-warning-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-error-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
              </div>
              <div className="text-sm text-secondary">
                <span className="font-semibold text-gray-900">10,000+</span> մասնագետ վստահում է մեր գործիքներին
              </div>
            </div>
            <p className="text-sm text-secondary max-w-md">
              Միանացեք հազարավոր մասնագետներին, որոնք բարելավելել են իրենց գործիքային հավաքածը և բարձրացրել իրենց աշխատանքի որակը։
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};