// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import developerAnimation from '../assets/developer-boy.json';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import InterviewRoadmap from '../components/InterviewRoadmap';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  // Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/topic/topicget`);
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };
    fetchTopics();
  }, []);

  return (
    <>
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <LoginForm />
            <button className="modal-close-btn" onClick={() => setShowLogin(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <SignupForm />
            <button className="modal-close-btn" onClick={() => setShowSignup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home-hero" id="home">
        <div className="hero-text">
          <h1>Free Mock Interview Topics</h1>
          <p>Practice. Get Confident. Get Hired.</p>
          <button className="cta-btn" onClick={() => setShowSignup(true)}>Start Now for Free!</button>
        </div>
        <div className="hero-animation">
          <Lottie animationData={developerAnimation} style={{ height: 300, width: 300 }} />
        </div>
      </section>

      {/* Topics Section */}
      <section className="topics-section" id="topics">
        <h2>Select a Topic</h2>
        <div className="topics-container">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <div
                key={index}
                className="home-topic-card"
                onClick={() => navigate(`/midPage/${topic._id}`)}
              >
                <div className="topic-emoji">{topic.emoji}</div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            ))
          ) : (
            <p className="loading-text">Loading topics...</p>
          )}
        </div>
      </section>

      {/* Interview Roadmap Component */}
      <InterviewRoadmap />
    </>
  );
};

export default Home;
