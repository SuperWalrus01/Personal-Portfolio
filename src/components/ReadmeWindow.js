import React, { useState, useRef, useEffect } from 'react';
import './ReadmeWindow.css';

function ReadmeWindow({ onClose, onMinimize }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.traffic-light')) return;
    if (e.target.closest('.window-titlebar')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  // UseEffect handles mouse move/up listeners with handlers defined inside the effect
  useEffect(() => {
    function handleMouseMove(e) {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    }

    function handleMouseUp() {
      setIsDragging(false);
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div 
      className="window readme-window" 
      ref={windowRef}
      style={{
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
      }}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="traffic-lights">
          <button className="traffic-light close" onClick={onClose}></button>
          <button className="traffic-light minimize" onClick={onMinimize}></button>
          <button className="traffic-light maximize"></button>
        </div>
        <div className="window-title">CV.txt</div>
        {/* Mobile close button (hidden on desktop) */}
        <button className="mobile-close" onClick={onClose} aria-label="Close">Close</button>
      </div>
      
      <div className="readme-content">
        <div className="readme-header">
          <h1>Keenan Jusak</h1>
          <p className="subtitle">Mathematics Graduate | Data Enthusiast | Problem Solver</p>
        </div>

        <div className="readme-section">
          <h2>👋 About Me</h2>
          <p>
            Hello! I'm Keenan Jusak, a mathematics student with a passion for using mathematical
            thinking and computational tools to solve real-world problems. I combine rigorous
            analytical skills with practical programming knowledge to tackle challenges in data
            science and software development.
          </p>
        </div>

        <div className="readme-section">
          <h2>🎓 Education</h2>
          <p>
            <strong>Warwick Foundation Year — Mathematics and Statistics (Foundation)</strong><br />
            University of Warwick (Foundation Programme) | Expected Jul 2026
          </p>
          <ul>
            <li>Foundation programme delivering an A-level syllabus in mathematics and statistics</li>
            <li>Core modules: Pure Mathematics, Statistics, Further Mathematics, Interdisciplinary Mathematics</li>
            <li>Focus on problem solving, proof techniques, and data analysis to prepare for degree-level study</li>
          </ul>

          <p>
            <strong>High School Diploma, Natural Sciences</strong><br />
            Canisius College (Kolese Kanisius) | Jul 2022 – May 2025
          </p>
          <ul>
            <li>Grade: 92.3 (Magna Cum Laude)</li>
            <li>Activities: Founder and Head of CaniMath; Co‑Founder and Treasurer of CaniEngineering</li>
          </ul>
        </div>

        <div className="readme-section">
          <h2>💼 Skills & Expertise</h2>
          <div className="skills-grid">
            <div>
              <h3>Mathematics & Statistics</h3>
              <p>Continuous-Time Markov Chains (CTMC), Stochastic modelling, Mathematical modelling</p>
            </div>
            <div>
              <h3>Data & Tools</h3>
              <p>Python, R, scikit-learn, LightGBM, XGBoost, Pandas, NumPy, Matplotlib, LaTeX</p>
            </div>
            <div>
              <h3>Web & Development</h3>
              <p>Reactjs, Supabase</p>
            </div>
            <div>
              <h3>Leadership & Org</h3>
              <p>Founding student communities, Treasury and financial reporting, Event planning</p>
            </div>
          </div>
        </div>

        <div className="readme-section">
          <h2>🚀 What I'm Working On</h2>
          <p>
            Currently exploring the intersection of mathematics and technology through various 
            projects involving data analysis, machine learning, and web development. Always 
            excited to collaborate on challenging problems that require both mathematical 
            rigor and creative thinking.
          </p>
        </div>

        <div className="readme-section">
          <h2>📫 Get In Touch</h2>
          <div className="contact-links">
            <a href={"https://www.linkedin.com/in/damianus-keenan-jusak-74552623b/"} target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
            <a href={"https://github.com/keenanjusak"} target="_blank" rel="noopener noreferrer">
              🐙 GitHub
            </a>
            <a href={"https://www.kaggle.com/keenanjusak"} target="_blank" rel="noopener noreferrer">
              📊 Kaggle
            </a>
          </div>
        </div>

        <div className="readme-section">
          <h2>🗣 Languages</h2>
          <ul>
            <li>Bahasa Indonesia — Fluent</li>
            <li>English — Fluent</li>
            <li>Chinese (Mandarin) — Elementary proficiency</li>
          </ul>
        </div>

        <div className="readme-footer">
          <p>💡 "Mathematics is not about numbers, equations, or algorithms: it is about understanding." - William Paul Thurston</p>
        </div>
      </div>
    </div>
  );
}

export default ReadmeWindow;
