import { useState, useEffect } from 'react';
import { OFFER } from '../config';
import { stockStorage } from '../utils/storage';
import { getCurrentISOString, getDeterministicRandom } from '../utils/time';
import { getDiscountPercentage } from '../data/sampleData';

/**
 * Stock state interface
 */
interface StockState {
  initial: number;
  current: number;
  lastTickAt: string;
}

/**
 * PriceBadge component props
 */
interface PriceBadgeProps {
  currentPrice: number;
  originalPrice: number;
  className?: string;
}

/**
 * Hook to manage fake stock counter that decreases over time
 */
const useStockCounter = (): number => {
  const [stock, setStock] = useState(OFFER.INITIAL_STOCK);

  useEffect(() => {
    const updateStock = () => {
      let stockState = stockStorage.get();
      
      // Initialize stock state if not exists
      if (!stockState) {
        stockState = {
          initial: OFFER.INITIAL_STOCK,
          current: OFFER.INITIAL_STOCK,
          lastTickAt: getCurrentISOString(),
        };
        stockStorage.set(stockState);
        setStock(stockState.current);
        return;
      }

      const now = new Date();
      const lastTick = new Date(stockState.lastTickAt);
      const minutesSinceLastTick = (now.getTime() - lastTick.getTime()) / (1000 * 60);

      // Use deterministic random to add jitter but keep it consistent per day
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const jitter = getDeterministicRandom(`stock-${dayOfYear}`) * 10 - 5; // -5 to +5 minutes
      const decrementInterval = OFFER.DECREMENT_EVERY_MIN + jitter;

      // Check if it's time to decrement
      if (minutesSinceLastTick >= decrementInterval && stockState.current > OFFER.MIN_STOCK_FLOOR) {
        const decrements = Math.floor(minutesSinceLastTick / decrementInterval);
        const newCurrent = Math.max(OFFER.MIN_STOCK_FLOOR, stockState.current - decrements);
        
        const newStockState: StockState = {
          ...stockState,
          current: newCurrent,
          lastTickAt: getCurrentISOString(),
        };
        
        stockStorage.set(newStockState);
        setStock(newCurrent);
      } else {
        setStock(stockState.current);
      }
    };

    updateStock();

    // Check for updates every minute
    const interval = setInterval(updateStock, 60000);

    return () => clearInterval(interval);
  }, []);

  return stock;
};

/**
 * PriceBadge component showing current price, original price, discount, and stock
 */
export const PriceBadge: React.FC<PriceBadgeProps> = ({
  currentPrice,
  originalPrice,
  className = '',
}) => {
  const stock = useStockCounter();
  const discountPercentage = getDiscountPercentage(originalPrice, currentPrice);

  // Track analytics on mount
  useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('price_badge_view', {
        current_price: currentPrice,
        original_price: originalPrice,
        discount_percentage: discountPercentage,
        stock_level: stock,
      });
    }
  }, [currentPrice, originalPrice, discountPercentage, stock]);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-primary-200 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-success-500/10 to-transparent rounded-tr-full"></div>
      
      <div className="relative p-8">
        {/* Flash sale badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-warning-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            🔥 Ակցիա
          </div>
        </div>

        {/* Price section */}
        <div className="text-center mt-4 mb-6">
          {/* Discount percentage - large and prominent */}
          <div className="inline-block bg-gradient-to-r from-error-500 to-error-600 text-white text-xl font-bold px-4 py-2 rounded-xl mb-4 transform -rotate-3 shadow-lg">
            -{discountPercentage}% ԶԵՂՉ
          </div>
          
          {/* Current price - hero element */}
          <div className="relative">
            <div className="text-5xl font-black text-primary-600 mb-2 leading-none">
              {currentPrice.toLocaleString()}
              <span className="text-2xl ml-1">֏</span>
            </div>
            
            {/* Original price with strikethrough */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-lg text-gray-500 line-through font-medium">
                {originalPrice.toLocaleString()} ֏
              </span>
              <div className="bg-success-100 text-success-700 px-2 py-1 rounded text-sm font-semibold">
                Խնայել {(originalPrice - currentPrice).toLocaleString()} ֏
              </div>
            </div>
          </div>
        </div>

        {/* Stock urgency */}
        <div className="bg-gradient-to-r from-warning-50 to-orange-50 border border-warning-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse"></div>
            <span className="text-warning-700 font-semibold text-sm">Միայն այսօր</span>
          </div>
          <div className="text-center">
            <span className="text-gray-700">Մնացել է ընդամենը </span>
            <span className="text-2xl font-bold text-warning-600 bg-white px-2 py-1 rounded shadow-sm">{stock}</span>
            <span className="text-gray-700"> հատ այս գնով</span>
          </div>
        </div>

        {/* Value propositions - improved design */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-success-800">Անվճար առաքում</div>
              <div className="text-success-600 text-sm">Ամբողջ Հայաստանում</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">🛡️</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-primary-800">2 տարի երաշխիք</div>
              <div className="text-primary-600 text-sm">Անվճար սպասարկում</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
            <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">↩️</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-secondary-800">30 օր վերադարձ</div>
              <div className="text-secondary-600 text-sm">100% գումարի վերադարձ</div>
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
            <span className="text-gray-700 font-medium">🔒 Անվտանգ և արագ պատվեր</span>
          </div>
        </div>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary-300 animate-pulse opacity-30"></div>
      </div>
    </div>
  );
};