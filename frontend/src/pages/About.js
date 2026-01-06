// src/pages/About.js
import React from 'react';
import Lottie from 'lottie-react';
import aboutAnimation from '../animations/about.json';

const features = [
  { icon: '💡', title: 'Interactive Practice', text: 'Hands-on problems and challenges to sharpen your skills.' },
  { icon: '📊', title: 'Progress Tracking', text: 'Monitor your growth and stay motivated throughout your journey.' },
  { icon: '🤝', title: 'Peer Collaboration', text: 'Learn, share, and grow with fellow learners and mentors.' },
];

const journey = [
  { title: 'Start with Basics', desc: 'Begin with core coding and logic-building exercises.' },
  { title: 'Daily Challenges', desc: 'Improve steadily with curated daily problems.' },
  { title: 'Mock Interviews', desc: 'Simulate real interviews and get feedback.' },
  { title: 'Get Hired', desc: 'Be confident and prepared for your big opportunity!' },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-text-content">
          <h1 className="about-heading">About Interview Prep</h1>
          <p className="about-subtext">
            Empowering developers to master technical interviews with confidence.
          </p>
        </div>
        <div className="about-animation-box">
          <Lottie animationData={aboutAnimation} loop />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="about-card-section">
        <h2 className="about-section-title">Why Choose Us?</h2>
        <div className="about-card-container">
          {features.map((feature, idx) => (
            <div key={idx} className="about-card">
              <div className="about-card-icon">{feature.icon}</div>
              <h3 className="about-card-title">{feature.title}</h3>
              <p className="about-card-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline / Journey */}
      <div className="about-timeline-section">
        <h2 className="about-section-title">Your Learning Journey</h2>
        <div className="about-timeline">
          {journey.map((step, idx) => (
            <div key={idx} className="about-timeline-item">
              <div className="about-timeline-circle">{idx + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="about-cta-section">
        <h2 className="about-cta-heading">Ready to Start?</h2>
        <p className="about-cta-text">
          Join us today and prepare to ace your interviews like a pro.
        </p>
        <button className="about-cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default About;
