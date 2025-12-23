import React from 'react';
import './Desktop.css';

function Desktop({ onOpenReadme }) {
  return (
    <div className="desktop">
      <div className="desktop-icons">
        <div className="desktop-icon" onClick={onOpenReadme}>
          <div className="icon-image">📄</div>
          <div className="icon-label">CV.txt</div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
