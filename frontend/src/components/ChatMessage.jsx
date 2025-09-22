import React from 'react';
import { Bot, User } from 'lucide-react';
import CardDisplay from './CardDisplay';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const formatMessage = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <div key={index} className="bullet-point">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="message-line">
          {line}
        </div>
      );
    });
  };

  return (
    <div className={`message-wrapper ${message.type === 'user' ? 'message-user' : 'message-bot'}`}>
      <div className="message-content">
        <div className={`avatar ${message.type === 'user' ? 'avatar-user' : 'avatar-bot'}`}>
          {message.type === 'user' ? (
            <User className="avatar-icon" />
          ) : (
            <Bot className="avatar-icon" />
          )}
        </div>
        
        <div className={`message-bubble ${message.type === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
          <div className="message-text">
            {message.type === 'bot' ? formatMessage(message.content) : message.content}
          </div>
          
          {message.type === 'bot' && message.cardData && message.cardData.length > 0 && (
            <CardDisplay cardData={message.cardData} />
          )}
          
          <div className="message-timestamp">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
