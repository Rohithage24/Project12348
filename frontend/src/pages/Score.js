// src/pages/Score.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Score = () => {
  const { userId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND}/textRecords/${userId}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [userId]);

  if (loading) return <h2 className="score-loading">Loading Scores...</h2>;

  if (!results || results.length === 0) {
    return <h2 className="score-loading">No Score Data Found</h2>;
  }

  return (
    <div className="score-container">
      <h1 className="score-heading">📊 Your Test Results</h1>

      {results.map((result, index) => (
        <div key={index} className="score-card">
          <h2 className="score-topic">{result.topicName || "Unknown Topic"}</h2>
          <p><b>Score:</b> {result.score ?? "N/A"}</p>
          <p><b>Date:</b> {result.date ? new Date(result.date).toLocaleString() : "N/A"}</p>

          {result.questions && result.questions.length > 0 && (
            <>
              <h3 className="score-subHeading">Questions:</h3>
              <ul className="score-questionList">
                {result.questions.map((q, idx) => (
                  <li key={idx} className="score-questionItem">
                    <p><b>Q:</b> {q.questionText}</p>
                    <p><b>Your Answer:</b> {q.userAnswer}</p>
                    <p><b>Correct Answer:</b> {q.correctAnswer}</p>
                    <p><b>Score:</b> {q.QuesScore}</p>
                    <p><b>Accuracy:</b> {q.accuracy}%</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Score;
