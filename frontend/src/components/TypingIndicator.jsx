import React from 'react';
import { Bot } from 'lucide-react';
import './TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-content">
        <div className="avatar avatar-bot">
          <Bot className="avatar-icon" />
        </div>
        <div className="typing-bubble">
          <div className="typing-dots">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
