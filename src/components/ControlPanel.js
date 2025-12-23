import React from 'react';
import './ControlPanel.css';

function ControlPanel({ onGenerateSection }) {
  return (
    <div className="notebook-cell code-cell">
      <div className="cell-input">
        <div className="cell-prompt">In [1]:</div>
        <div className="cell-code">
          <pre><code>
<span className="keyword">import</span> portfolio <span className="keyword">as</span> pf

<span className="comment"># Initialize portfolio sections</span>
pf.<span className="function">load</span>(<span className="string">"education"</span>, <span className="string">"projects"</span>, <span className="string">"skills"</span>)
          </code></pre>
        </div>
      </div>
      <div className="cell-output">
        <div className="control-panel">
          <button className="control-btn education-btn" onClick={() => onGenerateSection('education')}>
            <span className="btn-icon">🎓</span>
            <span className="btn-text">Education</span>
          </button>
          <button className="control-btn projects-btn" onClick={() => onGenerateSection('projects')}>
            <span className="btn-icon">💻</span>
            <span className="btn-text">Projects</span>
          </button>
          <button className="control-btn skills-btn" onClick={() => onGenerateSection('skills')}>
            <span className="btn-icon">⚡</span>
            <span className="btn-text">Skills</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
