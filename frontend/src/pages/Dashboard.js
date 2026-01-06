// src/pages/Dashboard.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  // Sample data
  const totalQuestions = 10;
  const correct = 6;
  const incorrect = 2;
  const unattempted = totalQuestions - (correct + incorrect);

  const percentage = (correct / totalQuestions) * 100;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Test Performance</h2>

      <div className="dashboard-chart">
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(0)}%`}
          styles={buildStyles({
            textColor: '#2d3436',
            pathColor: '#00b894',
            trailColor: '#dfe6e9',
            strokeLinecap: 'round',
          })}
        />
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat correct">
          <h3>{correct}</h3>
          <p>Correct</p>
        </div>
        <div className="dashboard-stat incorrect">
          <h3>{incorrect}</h3>
          <p>Incorrect</p>
        </div>
        <div className="dashboard-stat unattempted">
          <h3>{unattempted}</h3>
          <p>Unattempted</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
