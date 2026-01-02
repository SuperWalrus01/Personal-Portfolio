import React, { useState, useEffect } from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import PortfolioWindow from './components/PortfolioWindow';
import ReadmeWindow from './components/ReadmeWindow';
import WarwickWallpaper from './components/WarwickWallpaper';
// Math app removed

function App() {
  const [windows, setWindows] = useState({
    portfolio: true,
    readme: false,
    finder: false,
    terminal: false
  });

  const [activeApp, setActiveApp] = useState('Portfolio');
  const [activeTab, setActiveTab] = useState('education');
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Detect if running as PWA (standalone mode)
  useEffect(() => {
    const isInStandaloneMode = () => {
      return (window.matchMedia('(display-mode: standalone)').matches) || 
             (window.navigator.standalone) || 
             document.referrer.includes('android-app://');
    };
    
    setIsStandalone(isInStandaloneMode());
    
    // Show install prompt only on iOS Safari and not in standalone
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInWebAppiOS = window.navigator.standalone === true;
    
    if (isIOS && !isInWebAppiOS && !sessionStorage.getItem('installPromptShown')) {
      setTimeout(() => setShowInstallPrompt(true), 3000);
    }
  }, []);

  const dismissInstallPrompt = () => {
    setShowInstallPrompt(false);
    sessionStorage.setItem('installPromptShown', 'true');
  };

  const openWindow = (windowName) => {
    setWindows(prev => {
      // Make CV and Portfolio mutually exclusive
      const next = { ...prev, [windowName]: true };
      if (windowName === 'readme') {
        next.portfolio = false;
      }
      if (windowName === 'portfolio') {
        next.readme = false;
      }
      return next;
    });
    
    if (windowName === 'readme') {
      setActiveApp('TextEdit');
    } else if (windowName === 'portfolio') {
      setActiveApp('Portfolio');
    } else {
      setActiveApp(windowName.charAt(0).toUpperCase() + windowName.slice(1));
    }
  };

  const closeWindow = (windowName) => {
    setWindows(prev => ({ ...prev, [windowName]: false }));
    setActiveApp('Finder');
  };

  const minimizeWindow = (windowName) => {
    setWindows(prev => ({ ...prev, [windowName]: false }));
    setActiveApp('Finder');
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleOpenReadme = () => {
    openWindow('readme');
  };

  return (
    <div className="App">
      <WarwickWallpaper />
      <StatusBar activeApp={activeApp} />
      <Desktop onOpenReadme={handleOpenReadme} />
      
      {/* iOS Install Prompt */}
      {showInstallPrompt && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(26, 31, 46, 0.95)',
          color: '#e5e7eb',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          zIndex: 9999,
          maxWidth: '90%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <p style={{ marginBottom: '8px', fontSize: '14px' }}>
            Install this app on your iPhone: tap <span style={{ fontSize: '18px' }}>⎙</span> then "Add to Home Screen"
          </p>
          <button 
            onClick={dismissInstallPrompt}
            style={{
              marginTop: '8px',
              padding: '6px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Got it
          </button>
        </div>
      )}
      
      <div className="windows-container">
        {windows.portfolio && (
          <PortfolioWindow 
            onClose={() => closeWindow('portfolio')}
            onMinimize={() => minimizeWindow('portfolio')}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
        {windows.readme && (
          <ReadmeWindow 
            onClose={() => closeWindow('readme')}
            onMinimize={() => minimizeWindow('readme')}
          />
        )}
        // Math app removed
      </div>
      <Dock onOpenWindow={openWindow} />
    </div>
  );
}

export default App;
