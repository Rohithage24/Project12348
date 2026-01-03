import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ emoji, title, route }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        margin: '10px',
        width: '250px',
        cursor: 'pointer',
        backgroundColor: '#ecf0f1',
        transition: 'transform 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h3>{emoji} {title}</h3>
      <p>Click to explore {title} questions</p>
    </div>
  );
};

export default TopicCard;
