import React, { useState } from 'react';
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
