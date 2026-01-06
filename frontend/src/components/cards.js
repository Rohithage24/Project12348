import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
