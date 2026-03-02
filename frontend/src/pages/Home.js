import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Ensure this path is correct
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import InterviewRoadmap from '../components/InterviewRoadmap';

const Home = () => {
  const [auth] = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [topics, setTopics] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. HANDLES LOGIN POPUP LOGIC ON REFRESH/REDIRECT
  useEffect(() => {
    // If a redirect sent an 'openLogin' state AND the user is NOT logged in
    if (location.state?.openLogin && !auth?.user) {
      setShowLogin(true);
      
      // Clean the location state so the popup doesn't reappear on manual refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, auth]);

  // 2. FETCH TOPICS
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

  // 3. SMART CTA HANDLER
  const handleStartNow = () => {
    if (auth?.user) {
      // If logged in, smooth scroll to topics instead of showing signup
      const element = document.getElementById('topics-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setShowSignup(true);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Login Modal - Only shown if triggered AND user is not logged in */}
      {showLogin && !auth?.user && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <LoginForm />
            <button className="modal-close-btn" onClick={() => setShowLogin(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Signup Modal - Only shown if triggered AND user is not logged in */}
      {showSignup && !auth?.user && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <SignupForm />
            <button className="modal-close-btn" onClick={() => setShowSignup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-container">
          <div className="badge-ai">🤖 AI-Powered Interview Prep ✨</div>
          <h1 className="hero-title">
            Free Mock <br /> <span>Interview Topics</span>
          </h1>
          <p className="hero-subtitle">Practice. Get Confident. Get Hired.</p>
          
          <button className="cta-btn" onClick={handleStartNow}>
            Start Now for Free! ⚡
          </button>

          <div className="stats-row">
            <div className="stat-item"><strong>500+</strong><p>Questions</p></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><strong>50K+</strong><p>Users</p></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><strong>95%</strong><p>Success Rate</p></div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="topics-section" id="topics-section">
        <div className="section-header">
           <span className="tiny-title">🧠 AI CURATED TOPICS</span>
           <h2>Select a Topic</h2>
        </div>
        
        <div className="topics-container">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <div
                key={index}
                className="home-topic-card"
                onClick={() => navigate(`/midPage/${topic._id}`)}
              >
                <div className="topic-icon-wrapper">
                   <span className="topic-emoji">{topic.emoji || '🚀'}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            ))
          ) : (
            <div className="loading-spinner">Loading expert topics...</div>
          )}
        </div>
      </section>

      {/* Interview Roadmap Section */}
      <section className="roadmap-outer-section">
         <div className="section-header">
            <span className="tiny-title">✨ YOUR PATH</span>
            <h2>🚀 Your Interview Preparation Journey</h2>
         </div>
         <InterviewRoadmap />
      </section>
    </div>
  );
};

export default Home;