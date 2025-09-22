import React from 'react';
import { TrendingUp } from 'lucide-react';
import './PriceDisplay.css';

const PriceDisplay = ({ prices }) => {
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return `$${price.toFixed(2)}`;
  };

  const getConditionDisplayName = (condition) => {
    const conditionMap = {
      'normal': 'Normal',
      'holofoil': 'Holofoil',
      '1stEdition': '1st Edition',
      'unlimited': 'Unlimited',
      'reverseHolofoil': 'Reverse Holo'
    };
    return conditionMap[condition] || condition.charAt(0).toUpperCase() + condition.slice(1);
  };

  if (!prices || Object.keys(prices).length === 0) {
    return null;
  }

  return (
    <div className="price-display">
      <div className="price-header">
        <TrendingUp className="price-icon" />
        <span className="price-title">Market Prices</span>
      </div>
      
      <div className="price-grid">
        {Object.entries(prices).map(([condition, priceData]) => (
          <div key={condition} className="price-card">
            <div className="price-condition">
              {getConditionDisplayName(condition)}
            </div>
            <div className="price-values">
              {priceData.market && (
                <div className="price-item price-market">
                  <span className="price-label">Market:</span>
                  <span className="price-amount">{formatPrice(priceData.market)}</span>
                </div>
              )}
              {priceData.low && (
                <div className="price-item">
                  <span className="price-label">Low:</span>
                  <span className="price-amount">{formatPrice(priceData.low)}</span>
                </div>
              )}
              {priceData.mid && (
                <div className="price-item">
                  <span className="price-label">Mid:</span>
                  <span className="price-amount">{formatPrice(priceData.mid)}</span>
                </div>
              )}
              {priceData.high && (
                <div className="price-item">
                  <span className="price-label">High:</span>
                  <span className="price-amount">{formatPrice(priceData.high)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceDisplay;
