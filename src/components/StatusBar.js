import React, { useState, useEffect } from 'react';
import './StatusBar.css';

function StatusBar({ activeApp }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="apple-logo"></span>
        <span className="active-app-name">{activeApp}</span>
      </div>
      <div className="status-center">
        <span className="user-name">Keenan Jusak</span>
      </div>
      <div className="status-right">
        <span className="status-icon">📶</span>
        <span className="status-icon">🔋</span>
        <span className="status-time">{time}</span>
      </div>
    </div>
  );
}

export default StatusBar;
