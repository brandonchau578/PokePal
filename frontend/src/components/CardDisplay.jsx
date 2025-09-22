import React from 'react';
import PriceDisplay from './PriceDisplay';
import './CardDisplay.css';

const CardDisplay = ({ cardData }) => {
  if (!cardData || cardData.length === 0) return null;

  return (
    <div className="card-display-container">
      {cardData.map((card, index) => (
        <div key={index} className="card-item">
          <div className="card-content">
            {card.image && (
              <div className="card-image-container">
                <img
                  src={card.image}
                  alt={card.name}
                  className="card-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="card-details">
              <h3 className="card-name">{card.name}</h3>
              
              <div className="card-info">
                {card.set && (
                  <div className="info-item">
                    <span className="info-label">Set:</span>
                    <span className="info-value">{card.set}</span>
                  </div>
                )}
                {card.rarity && (
                  <div className="info-item">
                    <span className="info-label">Rarity:</span>
                    <span className="info-value">{card.rarity}</span>
                  </div>
                )}
                {card.number && (
                  <div className="info-item">
                    <span className="info-label">Number:</span>
                    <span className="info-value">{card.number}</span>
                  </div>
                )}
                {card.hp && (
                  <div className="info-item">
                    <span className="info-label">HP:</span>
                    <span className="info-value">{card.hp}</span>
                  </div>
                )}
                {card.types && card.types.length > 0 && (
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{card.types.join(', ')}</span>
                  </div>
                )}
              </div>
              
              {card.prices && <PriceDisplay prices={card.prices} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDisplay;
