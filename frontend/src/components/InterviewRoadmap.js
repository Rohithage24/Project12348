// src/components/InterviewRoadmap.js
import React from 'react';
import { FaLightbulb, FaCode, FaKeyboard, FaTrophy } from 'react-icons/fa';

const steps = [
  {
    title: 'Learn Basics',
    desc: 'Understand key concepts of JS, React, HTML, CSS & Java.',
    icon: <FaLightbulb size={28} className="text-white" />,
  },
  {
    title: 'Build Projects',
    desc: 'Create real-world mini apps to build your portfolio.',
    icon: <FaCode size={28} className="text-white" />,
  },
  {
    title: 'Practice Questions',
    desc: 'Solve questions and understand interview patterns.',
    icon: <FaKeyboard size={28} className="text-white" />,
  },
  {
    title: 'Crack Interviews',
    desc: 'Land your dream job with strong preparation.',
    icon: <FaTrophy size={28} className="text-white" />,
  },
];

const InterviewRoadmap = () => {
  return (
    <section className="roadmap-section">
      <h2 className="roadmap-title">🚀 Your Interview Preparation Journey</h2>

      <div className="roadmap-timeline">
        {steps.map((step, idx) => (
          <div key={idx} className="roadmap-card">
            <div className="roadmap-icon-wrapper">{step.icon}</div>
            <h3 className="roadmap-step-title">{step.title}</h3>
            <p className="roadmap-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InterviewRoadmap;
