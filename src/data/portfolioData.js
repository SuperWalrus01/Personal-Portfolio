const portfolioData = {
  education: [
    {
      degree: "Warwick Foundation Year — Mathematics and Statistics (Foundation)",
      institution: "University of Warwick (Foundation Programme)",
      years: "Expected Jul 2026",
      details: [
        "Foundation programme delivering an A-level syllabus in mathematics and statistics",
        "Core modules: Pure Mathematics, Statistics, Further Mathematics, Interdisciplinary Mathematics",
        "Focus on problem solving, proof techniques, and data analysis to prepare for degree-level study"
      ]
    },
    {
      degree: "High School Diploma, Natural Sciences",
      institution: "Canisius College (Kolese Kanisius)",
      years: "Jul 2022 – May 2025",
      details: [
        "Grade: 92.3 (Magna Cum Laude)",
        "Activities: Founder and Head of CaniMath; Co‑Founder and Treasurer of CaniEngineering"
      ]
    }
  ],

  projects: [
    {
      name: "Stochastic Modeling — Cyber Insurance Pricing",
      description: "Cyber insurance pricing using continuous-time Markov chains (CTMC). Empirical transition-rate estimation and Monte Carlo simulation to determine premiums.",
      tech: ["Python", "NumPy", "Pandas", "Monte Carlo", "Markov chains"],
      highlights: [
        "Modeled system states and estimated transition probabilities",
        "Applied Monte Carlo simulation for premium calculation"
      ],
      link: "https://github.com/keenanjusak"
    },
    {
      name: "Diabetes Prediction",
      description: "Review and implementation of supervised learning algorithms for diabetes prediction — feature engineering, model comparison and evaluation.",
      tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
      highlights: [
        "Compared multiple classifiers and evaluated performance",
        "Documented findings and reproducible code"
      ],
      link: "https://github.com/keenanjusak"
    },
    {
      name: "DRW Crypto Forecasting Competition",
      description: "Exploratory data analysis (EDA), PCA, feature selection and forecasting using LightGBM and XGBoost.",
      tech: ["Python", "LightGBM", "XGBoost", "PCA"],
      highlights: [
        "Applied PCA and feature selection to improve model stability",
        "Built gradient-boosting models for short-term crypto forecasting"
      ],
      link: "https://github.com/keenanjusak"
    }
  ],

  skills: {
    "Mathematics & Statistics": [
      "Continuous-Time Markov Chains (CTMC)",
      "Stochastic modelling",
      "Mathematical modelling"
    ],
    "Data Science & ML": [
      "Python",
      "R",
      "scikit-learn",
      "LightGBM",
      "XGBoost",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "LaTeX"
    ],
    "Web & Dev": [
      "Reactjs",
      "Supabase"
    ],
    "Leadership & Org": [
      "Founding student communities (CaniMath, CaniEngineering)",
      "Treasury and financial reporting",
      "Event planning"
    ]
  },

  clubs: [
    {
      name: "CaniMath",
      role: "Founder; Chairman",
      location: "Jakarta, Indonesia",
      period: "Oct 2024 – Present (Founder), Oct 2024 – May 2025 (Chairman)",
      highlights: [
        "Founded the CaniMath community for math enthusiasts",
        "Organised seminars and tutoring sessions",
        "Prepared peers for mathematical competitions"
      ]
    },
    {
      name: "CaniEngineering",
      role: "Co‑Founder; Head of Treasury",
      location: "Central Jakarta, Indonesia",
      period: "Jul 2024 – May 2025",
      highlights: [
        "Co‑founded a community for aspiring engineers",
        "Managed project coordination and funding",
        "Organised study tours to factories"
      ]
    },
    {
      name: "Badminton & Extracurriculars",
      role: "Player / Committee Member",
      location: "Canisius College",
      period: "2022 – 2025",
      highlights: [
        "Third Place, Springfield Cup – Men's Doubles (Feb 2024)",
        "Member of Canisius Badminton Team (A) and various event committees"
      ]
    }
  ],

  languages: [
    { name: "Bahasa Indonesia", level: "Fluent" },
    { name: "English", level: "Fluent" },
    { name: "Chinese (Mandarin)", level: "Elementary proficiency" }
  ],

  contact: {
    linkedin: "https://www.linkedin.com/in/damianus-keenan-jusak-74552623b/",
    kaggle: "https://www.kaggle.com/keenanjusak",
    github: "https://github.com/keenanjusak",
    email: "your.email@example.com"
  }
};

// Python code templates for each section
export const pythonCodeTemplates = {
  education: `# Import portfolio module
from portfolio import Education

# Create and display education section
edu = Education()
edu.add_degree(
    degree="BSc Mathematics with [Specialization]",
    institution="[University Name]",
    years="20XX – 20XX",
    details=[
        "Key modules: [Module 1], [Module 2], [Module 3]",
        "Dissertation: [Title or topic]",
        "Achievements: [Awards, scholarships]"
    ]
)
edu.display()`,

  projects: `# Import portfolio module
from portfolio import Projects

# Create and display projects section
projects = Projects()
projects.add_project(
    name="[Project Name]",
    description="[Brief description]",
    tech=["Python", "JavaScript", "NumPy", "Pandas"],
    highlights=[
        "Interesting feature or algorithm used",
        "Performance result or impact"
    ],
    link="[GitHub repo link]"
)
projects.display()`,

  skills: `# Import portfolio module
from portfolio import Skills

# Create and display skills section
skills = Skills()
skills.add_category("Programming", 
    ["Python", "JavaScript", "LaTeX"])
skills.add_category("Mathematics",
    ["Linear Algebra", "Probability", "Statistics"])
skills.add_category("Data & Tools",
    ["Pandas", "NumPy", "Matplotlib", "Git"])
skills.display()`,

  cv: `# Import portfolio module
from portfolio import CV

# Display CV information
cv = CV()
cv.set_links(
    view="https://drive.google.com/file/d/your-cv-link/view",
    download="https://drive.google.com/uc?export=download&id=your-cv-id"
)
cv.display()`
};

export default portfolioData;
