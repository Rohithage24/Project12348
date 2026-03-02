import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ProfileAnimation from "../animations/profile.json";
import FemaleAvatar from "../animations/Female avatar.json";

const Profile = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const animationData = auth?.user?.gender === "female" ? FemaleAvatar : ProfileAnimation;
  const total = auth?.user?.stats?.total || 10;
  const correct = auth?.user?.stats?.correct || 6;
  const incorrect = auth?.user?.stats?.incorrect || 3;
  const accuracy = ((correct / total) * 100).toFixed(0);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-dim)', margin: '5px 0 0 0' }}>Track your progress and achievements</p>
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Streak</h3>
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
              <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>{total}</span>
              <p>Total Questions</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid #4ade80' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#4ade80' }}>{correct}</span>
              <p>Correct</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid #f87171' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f87171' }}>{incorrect}</span>
              <p>Incorrect</p>
            </div>
            <div className="dashboard-stat" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-blue)' }}>{accuracy}%</span>
              <p>Avg Accuracy</p>
            </div>
          </div>

          <div className="progress-charts-section" style={{ marginTop: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0' }}>Current Progress</h3>
            <div className="progress-charts-grid">
              <ProgressRing value={correct} max={total} label="Correct" color="#4ade80" />
              <ProgressRing value={incorrect} max={total} label="Incorrect" color="#f87171" />
              <ProgressRing value={accuracy} max={100} label="Accuracy" color="#60a5fa" />
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
  const offset = circ - (value / max) * circ;

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
          {value}{max === 100 ? '%' : ''}
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '5px' }}>{label}</p>
    </div>
  );
};

export default Profile;