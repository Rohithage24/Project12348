// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ProfileAnimation from "../animations/profile.json";
import FemaleAvatar from "../animations/Female avatar.json";

// Animated counter component
const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setDisplay(Math.round(start));
    }, 50);
    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{display}</span>;
};

const CircularRing = ({ label, value, max, color, emoji }) => {
  const radius = 90;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="profile-ring">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className="profile-ring-bg"
          stroke="#eee"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="profile-ring-progress"
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1.2s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="profile-ring-label">
        {emoji} {label}: <AnimatedNumber value={value} /> / {max}
      </div>
    </div>
  );
};

const Profile = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleEditProfile = () => navigate("/settings");

  const animationData =
    auth?.user?.gender === "female" ? FemaleAvatar : ProfileAnimation;

  const totalQuestions = auth?.user?.stats?.total || 10;
  const correct = auth?.user?.stats?.correct || 6;
  const incorrect = auth?.user?.stats?.incorrect || 3;
  const unattempted = totalQuestions - correct - incorrect;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-animation">
          <Lottie animationData={animationData} loop={true} />
        </div>

        <h1 className="profile-title">Hi, {auth?.user?.Name || "User"}!</h1>
        <h2 className="profile-subtitle">Your Profile</h2>

        <div className="profile-details">
          <p><strong>Name:</strong> {auth?.user?.Name || "N/A"}</p>
          <p><strong>Address:</strong> {auth?.user?.address || "N/A"}</p>
          <p><strong>Email:</strong> {auth?.user?.gmail || "N/A"}</p>
          <p><strong>Mobile:</strong> {auth?.user?.mobile || "N/A"}</p>
        </div>

        <button className="profile-editButton" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>

      {/* Dashboard */}
      <div className="profile-dashboard">
        <h1 className="profile-dashboard-heading">📊 Your Dashboard</h1>

        <div className="profile-statsRow">
          <div className="profile-card correct-card">✅ Correct <br /> <AnimatedNumber value={correct} /></div>
          <div className="profile-card incorrect-card">❌ Incorrect <br /> <AnimatedNumber value={incorrect} /></div>
          <div className="profile-card unattempted-card">⚪ Unattempted <br /> <AnimatedNumber value={unattempted} /></div>
        </div>

        <div className="profile-ringsRow">
          <CircularRing label="Correct" value={correct} max={totalQuestions} color="#4caf50" emoji="✅" />
          <CircularRing label="Incorrect" value={incorrect} max={totalQuestions} color="#f44336" emoji="❌" />
          <CircularRing label="Unattempted" value={unattempted} max={totalQuestions} color="#ff9800" emoji="⚪" />
        </div>

        <div className="profile-extraInfo">
          <div className="profile-infoCard hotstreak-card">🔥 Hot Streak: 5 Correct!</div>
          <div className="profile-infoCard highscore-card">🏆 Highest Score: 9/10</div>
          <div className="profile-infoCard accuracy-card">🎯 Accuracy: {((correct / totalQuestions) * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
