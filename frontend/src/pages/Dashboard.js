import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useAuth } from '../context/AuthProvider'; // Assuming you use this for the user ID

const Dashboard = () => {
  const [auth] = useAuth();
  const [aggregates, setAggregates] = useState({
    avgScore: 0,
    avgAccuracy: 0,
    avgEmotion: 0,
    totalTests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCalculate = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/record/textRecords/${auth.user._id}`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const total = data.length;
          
          // Use reduce to sum all metrics
          const sums = data.reduce((acc, curr) => {
            return {
              score: acc.score + (curr.score || 0),
              accuracy: acc.accuracy + (curr.accuracy || 0),
              emotion: acc.emotion + (curr.emotion || 0)
            };
          }, { score: 0, accuracy: 0, emotion: 0 });

          setAggregates({
            avgScore: Math.round(sums.score / total),
            avgAccuracy: Math.round(sums.accuracy / total),
            avgEmotion: Math.round(sums.emotion / total),
            totalTests: total
          });
        }
      } catch (err) {
        console.error("Aggregation error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (auth.user?._id) fetchAndCalculate();
  }, [auth.user]);

  if (loading) return <div className="dashboard-container">Calculating metrics...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-row">
        <div className="user-profile-card">
          <h2>User Intelligence</h2>
          <p style={{ color: 'var(--text-dim)' }}>{auth.user?.email}</p>
          <div style={{ marginTop: '20px' }}>
            <span className="badge-ai">Verified Candidate</span>
          </div>
        </div>

        <div className="dashboard-stats-container">
          <div className="dashboard-stats">
            {/* Total Score Circle */}
            <div className="dashboard-stat">
              <div style={{ width: 65, height: 65 }}>
                <CircularProgressbar
                  value={aggregates.avgScore}
                  text={`${aggregates.avgScore}%`}
                  styles={buildStyles({
                    pathColor: '#00f2ff',
                    textColor: '#fff',
                    textSize: '25px',
                    trailColor: 'rgba(255,255,255,0.1)'
                  })}
                />
              </div>
              <p>Overall Performance</p>
            </div>

            {/* Accuracy Stat */}
            <div className="dashboard-stat" style={{ borderLeft: '2px solid #a855f7' }}>
              <h3>{aggregates.avgAccuracy}%</h3>
              <p>Avg Accuracy</p>
            </div>

            {/* Emotion Stat */}
            <div className="dashboard-stat" style={{ borderLeft: '2px solid #4ade80' }}>
              <h3>{aggregates.avgEmotion}%</h3>
              <p>Emotional IQ</p>
            </div>

            {/* Session Count */}
            <div className="dashboard-stat" style={{ borderLeft: '2px solid #facc15' }}>
              <h3>{aggregates.totalTests}</h3>
              <p>Tests Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;