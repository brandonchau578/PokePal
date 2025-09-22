import React from 'react';
import './ConnectionStatus.css';

const ConnectionStatus = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'connected': 
        return 'status-connected';
      case 'disconnected': 
        return 'status-disconnected';
      case 'error': 
        return 'status-error';
      default: 
        return 'status-unknown';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': 
        return 'Connected';
      case 'disconnected': 
        return 'Disconnected';
      case 'error': 
        return 'Connection Error';
      default: 
        return 'Unknown';
    }
  };

  const getIndicatorClass = () => {
    switch (status) {
      case 'connected': 
        return 'indicator-green';
      case 'disconnected': 
        return 'indicator-red';
      case 'error': 
        return 'indicator-yellow';
      default: 
        return 'indicator-gray';
    }
  };

  return (
    <div className={`connection-status ${getStatusClass()}`}>
      <div className={`status-indicator ${getIndicatorClass()}`}></div>
      <span className="status-text">{getStatusText()}</span>
    </div>
  );
};

export default ConnectionStatus;
