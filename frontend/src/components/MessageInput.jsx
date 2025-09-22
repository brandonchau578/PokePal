import React from 'react';
import { Send } from 'lucide-react';
import './MessageInput.css';

const MessageInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  onKeyPress, 
  disabled 
}) => {
  return (
    <div className="message-input-container">
      <div className="input-wrapper">
        <div className="input-group">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask me about Pokemon cards, prices, investing, or collecting tips..."
            className="message-textarea"
            rows="1"
            disabled={disabled}
          />
          <button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || disabled}
            className="send-button"
          >
            <Send className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
