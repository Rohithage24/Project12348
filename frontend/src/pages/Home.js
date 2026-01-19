import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import developerAnimation from "../assets/developer-boy.json";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import InterviewRoadmap from "../components/InterviewRoadmap";
import { authFetch } from "../utils/api";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth] = useAuth();
  const navigate = useNavigate();

  // 🔹 Fetch topics (PUBLIC – no login required)
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { status, data } = await authFetch(
          `${process.env.REACT_APP_BACKEND}/api/topic/topicget`
        );

        if (status === 200 && Array.isArray(data)) {
          setTopics(data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // 🔹 Handle topic click
  const handleTopicClick = (id) => {
    if (!auth?.token) {
      setShowLogin(true);
    } else {
      navigate(`/midPage/${id}`);
    }
  };

  return (
    <>
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SignupForm onClose={() => setShowSignup(false)} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-text">
          <h1>Free Mock Interview Topics</h1>
          <p>Practice. Get Confident. Get Hired.</p>
          <button className="cta-btn" onClick={() => setShowSignup(true)}>
            Start Now for Free!
          </button>
        </div>

        <div className="hero-animation">
          <Lottie
            animationData={developerAnimation}
            style={{ height: 300 }}
          />
        </div>
      </section>

      {/* Topics Section */}
      <section className="topics-section">
        <h2>Select a Topic</h2>

        <div className="topics-container">
          {loading ? (
            <p className="loading-text">Loading topics...</p>
          ) : topics.length > 0 ? (
            topics.map((topic) => (
              <div
                key={topic._id}
                className="home-topic-card"
                onClick={() => handleTopicClick(topic._id)}
              >
                <div className="topic-emoji">{topic.emoji}</div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            ))
          ) : (
            <p className="loading-text">No topics available</p>
          )}
        </div>
      </section>

      {/* Interview Roadmap */}
      <InterviewRoadmap />
    </>
  );
};

export default Home;
