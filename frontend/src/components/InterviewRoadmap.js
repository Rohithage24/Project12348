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
    <section style={containerStyle}>
      <h2 style={titleStyle}>🚀 Your Interview Preparation Journey</h2>
      <div style={timelineStyle}>
        {steps.map((step, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={iconWrapper}>{step.icon}</div>
            <h3 style={stepTitle}>{step.title}</h3>
            <p style={descStyle}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#f0f7ff',
  padding: '70px 30px',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '50px',
  color: '#2c3e50',
};

const timelineStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '40px',
};

const cardStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '30px 25px',
  borderRadius: '15px',
  width: '240px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  cursor: 'default',
};

const iconWrapper = {
  backgroundColor: '#2980b9',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  margin: '0 auto 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const stepTitle = {
  fontSize: '1.3rem',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const descStyle = {
  fontSize: '0.95rem',
  lineHeight: '1.4',
};

export default InterviewRoadmap;
