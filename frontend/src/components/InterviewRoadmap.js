// src/components/InterviewRoadmap.js
import React from 'react';
import { FaLightbulb, FaLaptop, FaKeyboard, FaTrophy } from 'react-icons/fa';

const steps = [
  {
    title: 'Learn Basics',
    desc: 'Understand key concepts of JS, React, HTML, CSS & Java.',
    icon: <FaLightbulb />,
  },
  {
    title: 'Build Projects',
    desc: 'Create real-world mini apps to build your portfolio.',
    icon: <FaLaptop />, // Changed to Laptop to match screenshot icon
  },
  {
    title: 'Practice Questions',
    desc: 'Solve questions and understand interview patterns.',
    icon: <FaKeyboard />,
  },
  {
    title: 'Crack Interviews',
    desc: 'Land your dream job with strong preparation.',
    icon: <FaTrophy />,
  },
];

const InterviewRoadmap = () => {
  return (
    <div className="roadmap-container">
      <div className="roadmap-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="roadmap-card">
            <div className="card-header">
              <div className="roadmap-icon-box">{step.icon}</div>
              {/* This generates the 01, 02, 03, 04 numbers */}
              <span className="step-number">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="card-body">
              <h3 className="roadmap-step-title">{step.title}</h3>
              <p className="roadmap-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewRoadmap;