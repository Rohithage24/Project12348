import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ProfileAnimation from "../animations/profile.json";
import FemaleAvatar from "../animations/Female avatar.json";

const Profile = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/record/textRecords/${auth.user._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    if (auth?.user?._id) fetchHistory();
  }, [auth.user]);

  // --- AGGREGATION LOGIC ---
  const calculateAvg = (key) => {
    if (!history || history.length === 0) return 0;
    const validRecords = history.filter(item => item[key] !== undefined);
    if (validRecords.length === 0) return 0;
    
    const sum = validRecords.reduce((acc, curr) => acc + (parseFloat(curr[key]) || 0), 0);
    return (sum / validRecords.length).toFixed(1);
  };

  const avgScore = calculateAvg('score');
  const avgAccuracy = calculateAvg('accuracy');
  const avgEmotion = calculateAvg('emotion');
  const totalTests = history.length;

  const animationData = auth?.user?.gender === "female" ? FemaleAvatar : ProfileAnimation;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-dim)', margin: '5px 0 0 0' }}>Track your aggregate performance across all sessions</p>
        </div>
        <button className="cta-btn" style={{ padding: '10px 25px' }} onClick={() => navigate("/settings")}>Edit Profile</button>
      </header>

      <div className="dashboard-header-row">
        {/* SIDEBAR / PROFILE CARD */}
        <div className="user-profile-card">
          <div className="avatar-wrapper" style={{ width: '120px', margin: '0 auto' }}>
            <Lottie animationData={animationData} loop={true} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <h2 style={{ margin: 0 }}>{auth?.user?.Name || "User"}</h2>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>Pro Member</p>
          </div>
          <div className="info-list" style={{ marginTop: '20px', fontSize: '0.9rem', lineHeight: '2' }}>
            <p style={{ margin: 0 }}>📍 {auth?.user?.address || "N/A"}</p>
            <p style={{ margin: 0 }}>📧 {auth?.user?.gmail || "N/A"}</p>
            <p style={{ margin: 0 }}>📱 {auth?.user?.mobile || "N/A"}</p>
          </div>
          
          <div style={{ marginTop: '25px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Activity Streak</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
               {[...Array(21)].map((_, i) => (
                <div key={i} style={{ height: '8px', borderRadius: '4px', background: i < 12 ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)' }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS AREA */}
        <div className="dashboard-stats-container">
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>{totalTests}</span>
              <p>Total Tests</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-blue)' }}>{avgScore}%</span>
              <p>Avg Score</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid #4ade80' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#4ade80' }}>{avgAccuracy}%</span>
              <p>Avg Accuracy</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid #fbbf24' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fbbf24' }}>{avgEmotion}%</span>
              <p>Avg Emotion</p>
            </div>
          </div>

          <div className="progress-charts-section" style={{ marginTop: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Performance Aggregates</h3>
            <div className="progress-charts-grid">
              <ProgressRing value={avgScore} max={100} label="Average Score" color="var(--accent-blue)" />
              <ProgressRing value={avgAccuracy} max={100} label="Average Accuracy" color="#4ade80" />
              <ProgressRing value={avgEmotion} max={100} label="Average Emotion" color="#fbbf24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressRing = ({ value, max, label, color }) => {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const safeValue = isNaN(value) ? 0 : value;
  const offset = circ - (safeValue / max) * circ;

  return (
    <div className="chart-item">
      <div className="dashboard-chart" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
          <circle cx="60" cy="60" r={r} stroke={color} strokeWidth="8" fill="none" 
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" 
            style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        </svg>
        <div style={{ position: 'absolute', fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
          {safeValue}%
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '5px' }}>{label}</p>
    </div>
  );
};

export default Profile;