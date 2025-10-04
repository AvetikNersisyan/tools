import React, { useState } from 'react';
import { PRODUCT } from '../data/sampleData';

/**
 * Gallery component props
 */
interface GalleryProps {
  className?: string;
}

/**
 * Image gallery with main image and thumbnails
 */
export const Gallery: React.FC<GalleryProps> = ({ className = '' }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = PRODUCT.images;

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
    
    if (window.trackEvent) {
      window.trackEvent('gallery_image_change', {
        from_index: activeImageIndex,
        to_index: index,
        image_url: images[index],
      });
    }
  };

  const handleMainImageClick = () => {
    if (window.trackEvent) {
      window.trackEvent('gallery_main_image_click', {
        image_index: activeImageIndex,
        image_url: images[activeImageIndex],
      });
    }
  };

  return (
    <section className={`section ${className}`}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Ապրանքի պատկերարան</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Մանրամասն ծանոթացեք մեր պրեմիում դրիլի հետ։ Յուրաքանչյուր մանրուք ստեղծված է մասնագիտական աշխատանքի համար։
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main image */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 group">
              <img
                src={images[activeImageIndex]}
                alt={`${PRODUCT.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                onClick={handleMainImageClick}
              />
              
              {/* Image overlay with info */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                    <p className="text-sm font-medium text-gray-800">Մեծացնելու համար կտտացրեք</p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows for mobile */}
              <button
                onClick={() => handleImageChange(activeImageIndex > 0 ? activeImageIndex - 1 : images.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg md:hidden transition-all"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => handleImageChange(activeImageIndex < images.length - 1 ? activeImageIndex + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg md:hidden transition-all"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`relative overflow-hidden rounded-lg aspect-square group ${
                  index === activeImageIndex
                    ? 'ring-2 ring-primary-500 ring-offset-2'
                    : 'hover:ring-2 hover:ring-primary-300 hover:ring-offset-1'
                } transition-all duration-200`}
              >
                <img
                  src={image}
                  alt={`${PRODUCT.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Active indicator */}
                {index === activeImageIndex && (
                  <div className="absolute inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
              </button>
            ))}
          </div>

          {/* Image counter */}
          <div className="text-center mt-4">
            <p className="text-sm text-secondary">
              {activeImageIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};