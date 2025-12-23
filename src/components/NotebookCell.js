import React, { useState } from 'react';
import './NotebookCell.css';
import portfolioData from '../data/portfolioData';

function NotebookCell({ type, cellNumber }) {
  const [showOutput, setShowOutput] = useState(false);

  const getCodeContent = () => {
    const codeTemplates = {
      education: `def show_education():
    education = [
        {
            "degree": "BSc Mathematics with [Specialization]",
            "institution": "[University Name]",
            "years": "20XX – 20XX",
            "details": [
                "Key modules: [Module 1], [Module 2], [Module 3]",
                "Dissertation: [Title or topic of final project]",
                "Achievements: [Awards, scholarships, classification]"
            ]
        },
        # Add more entries if needed
    ]
    return education

education = show_education()
display_education(education)`,
      projects: `def show_projects():
    projects = [
        {
            "name": "[Project Name]",
            "description": "[1–3 sentences describing the project]",
            "tech": ["Python", "JavaScript", "NumPy", "Pandas"],
            "highlights": [
                "Interesting feature or algorithm used",
                "Performance result, user impact, or learning"
            ],
            "link": "[GitHub repo or live demo link]"
        },
        # Add more projects
    ]
    return projects

projects = show_projects()
display_projects(projects)`,
      skills: `def show_skills():
    skills = {
        "Programming": ["Python", "JavaScript", "LaTeX", "[Other languages]"],
        "Mathematics": ["Linear Algebra", "Probability", "Statistics", "[Other areas]"],
        "Data & Tools": ["Pandas", "NumPy", "Matplotlib", "Git", "Jupyter"],
        "Other": ["Communication", "Teamwork", "[Any other relevant skills]"]
    }
    return skills

skills = show_skills()
display_skills(skills)`
    };
    return codeTemplates[type];
  };

  const renderOutput = () => {
    switch (type) {
      case 'education':
        return renderEducation();
      case 'projects':
        return renderProjects();
      case 'skills':
        return renderSkills();
      default:
        return null;
    }
  };

  const renderEducation = () => {
    return portfolioData.education.map((edu, index) => (
      <div key={index} className="education-card">
        <h3>{edu.degree}</h3>
        <div className="education-institution">{edu.institution}</div>
        <div className="education-years">{edu.years}</div>
        <ul className="education-details">
          {edu.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderProjects = () => {
    return portfolioData.projects.map((project, index) => (
      <div key={index} className="project-card">
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tech-stack">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="tech-tag">{tech}</span>
          ))}
        </div>
        <ul className="project-highlights">
          {project.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
        <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
    ));
  };

  const renderSkills = () => {
    return (
      <div className="skills-container">
        {Object.entries(portfolioData.skills).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h4>{category}</h4>
            <div className="skill-badges">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const formatCode = (code) => {
    return code.split('\n').map((line, index) => {
      let formattedLine = line;
      
      // Highlight keywords
      formattedLine = formattedLine.replace(/\b(def|return|import|from)\b/g, '<span class="keyword">$1</span>');
      
      // Highlight function names
      formattedLine = formattedLine.replace(/\b(show_\w+|display_\w+)\b/g, '<span class="function">$1</span>');
      
      // Highlight strings
      formattedLine = formattedLine.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
      
      // Highlight comments
      if (line.trim().startsWith('#')) {
        formattedLine = `<span class="comment">${line}</span>`;
      }
      
      return <div key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="notebook-cell code-cell">
      <div className="cell-input">
        <div className="cell-prompt">In [{cellNumber}]:</div>
        <div className="cell-code">
          <pre><code>{formatCode(getCodeContent())}</code></pre>
        </div>
      </div>
      <button className="run-btn" onClick={() => setShowOutput(!showOutput)}>
        ▶ Run Cell
      </button>
      {showOutput && (
        <div className="cell-output">
          {renderOutput()}
        </div>
      )}
    </div>
  );
}

export default NotebookCell;
