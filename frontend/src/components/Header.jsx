import React from 'react';
import { Bot, TrendingUp, Star } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';
import './Header.css';

const Header = ({ connectionStatus }) => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Bot className="logo-icon" />
            </div>
            <div className="header-text">
              <h1 className="app-title">PokePal</h1>
              <p className="app-subtitle">AI-Powered Pokemon Card Expert</p>
            </div>
          </div>
          
          <div className="header-right">
            <ConnectionStatus status={connectionStatus} />
            
            <div className="feature-badges">
              <div className="feature-badge feature-badge-green">
                <TrendingUp className="feature-icon" />
                <span className="feature-text">Live Prices</span>
              </div>
              <div className="feature-badge feature-badge-purple">
                <Star className="feature-icon" />
                <span className="feature-text">AI Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
