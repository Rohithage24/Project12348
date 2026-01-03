import React from "react";
import { useLocation } from "react-router-dom";

const Score = () => {
 const location = useLocation();
  const { result } = location.state || {}; 
  console.log(result);
  

  if (!result) {
    return <h2>No Score Data Found</h2>;
  }

  return (
    <div>
      <h1>Test Result</h1>
      <p><strong>Headline:</strong> {result.test?.headline}</p>
      <p><strong>Score:</strong> {result.test?.score}</p>

      <h3>Questions:</h3>
      <ul>
        {result.test?.questions?.map((q, idx) => (
          <li key={idx}>
            <p><b>Q:</b> {q.questionText}</p>
            <p><b>Your Answer:</b> {q.userAnswer}</p>
            <p><b>Correct Answer:</b> {q.correctAnswer}</p>
            <p><b>Score:</b> {q.QuesScore}</p>
            <p><b>Accuracy:</b> {q.accuracy}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Score
