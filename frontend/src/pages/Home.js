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
  const navigate = useNavigate();


 const [topics, setTopics] = useState([]);

 useEffect(() => {
  const fetchTopics = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/topicget`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  fetchTopics();
}, []);

 console.log(topics)
console.log("Backend URL:", process.env.REACT_APP_BACKEND );




  return (
    <>
      {showLogin && (
        <div style={overlayStyle} onClick={() => setShowLogin(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <LoginForm />
            <button onClick={() => setShowLogin(false)} style={closeBtnStyle}>Close</button>
          </div>
        </div>
      )}

      {showSignup && (
        <div style={overlayStyle} onClick={() => setShowSignup(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <SignupForm />
            <button onClick={() => setShowSignup(false)} style={closeBtnStyle}>Close</button>
          </div>
        </div>
      )}

      <section style={heroStyle} id="home">
        <div style={{ maxWidth: '400px' }}>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Free Mock Interview Topics</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Practice. Get Confident. Get Hired.</p>
          <button style={ctaBtnStyle}>Start Now for Free!</button>
        </div>
        <div>
          <Lottie animationData={developerAnimation} style={{ height: 300, width: 300 }} />
        </div>
      </section>

      <section style={{ padding: '60px 30px', backgroundColor: '#f9f9f9' }} id="topics">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Select a Topic</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
          {topics.map((topic, index) => (
           
            
            <div
              key={index}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
             
              onClick={() => navigate(`/midPage/${topic._id}`)}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{topic.emoji}</div>
              <h3 style={{ marginBottom: '10px' }}>{topic.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{topic.description}</p>
            </div>
          ))}
        </div>
      </section>
      <InterviewRoadmap />


      {/* <section id="contact" style={{ padding: '60px 30px', backgroundColor: '#eee', textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p>Email: contact@interviewprep.com</p>
      </section>

      <section id="about" style={{ padding: '60px 30px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
        <h2>About</h2>
        <p>We help students prepare for mock interviews and tech jobs!</p>
      </section> */}
    </>
  );
};

// Styles (same as before)
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  width: '400px',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const heroStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '60px 20px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  textAlign: 'center',
};

const ctaBtnStyle = {
  backgroundColor: '#fff',
  color: '#3498db',
  padding: '12px 25px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  width: '220px',
  padding: '30px 20px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: '0.3s ease',
  cursor: 'pointer',
};

export default Home;
