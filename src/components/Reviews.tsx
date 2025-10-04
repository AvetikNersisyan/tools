import React from 'react';
import { REVIEWS, getAverageRating } from '../data/sampleData';
import { formatDate } from '../utils/time';

/**
 * Reviews component props
 */
interface ReviewsProps {
  className?: string;
}

/**
 * Star rating component
 */
const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  rating, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6',
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${sizeClasses[size]}`}
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
};

/**
 * Reviews section with star ratings and testimonials
 */
export const Reviews: React.FC<ReviewsProps> = ({ className = '' }) => {
  const averageRating = getAverageRating(REVIEWS);
  const totalReviews = REVIEWS.length;

  React.useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('reviews_section_view', {
        average_rating: averageRating,
        total_reviews: totalReviews,
      });
    }
  }, [averageRating, totalReviews]);

  return (
    <section className={`section ${className}`}>
      <div className="container">
        {/* Section header with overall rating */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Ինչ են ասում մեր հաճախորդները</h2>
          
          {/* Average rating display */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.floor(averageRating)} size="lg" />
              <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <div className="text-secondary">
              <p className="font-medium">Հիմնված {totalReviews} գնահատականների վրա</p>
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="max-w-md mx-auto mb-8">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = REVIEWS.filter(review => review.rating === stars).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={stars} className="flex items-center gap-3 mb-1">
                  <span className="text-sm text-secondary w-8">{stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-warning-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-secondary w-8">{count}</span>
                </div>
              );
            })}
          </div>

          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Մի վստահեք միայն մեր խոսքերին։ Տեսեք ինչ են ասում իրական հաճախորդները մեր դրիլի մասին:
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="card hover:shadow-md transition-shadow duration-300"
            >
              <div className="card-body">
                {/* Rating and date */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-xs text-secondary">
                    {formatDate(review.date)}
                  </span>
                </div>

                {/* Review text */}
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  "{review.text}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">{review.name}</p>
                    <p className="text-xs text-secondary">Հաստատված հաճախորդ</p>
                  </div>
                  
                  {/* Verified badge */}
                  <div className="ml-auto">
                    <div className="badge badge-success text-xs">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.253.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Հաստատված
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
              {/* Trust badges */}
              <div className="flex items-center gap-2 text-sm text-secondary">
                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Secure Reviews</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-secondary">
                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified Purchases Only</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-secondary">
                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>No Fake Reviews</span>
              </div>
            </div>
            
            <p className="text-secondary text-sm">
              Բոլոր գնահատականները հաստատված հաճախորդներից են, որոնք գնել և օգտագործել են մեր ապրանքը։
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};