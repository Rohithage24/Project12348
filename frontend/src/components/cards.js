import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div 
      style={styles.card} 
      onClick={onClick}
    >
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    width: '280px',
    transition: 'transform 0.2s ease-in-out',
  },
  title: {
    color: '#2c3e50',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  description: {
    color: '#7f8c8d',
  },
};

export default Card;
