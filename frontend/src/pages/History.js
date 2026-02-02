// src/pages/History.js
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./History.css";

const History = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/record/gettext/${id}`,
        { credentials: "include" }
      );
      const result = await res.json();
      setData(result);
    };
    fetchHistory();
  }, [id]);

  if (!data) return <div className="history-loading">Loading...</div>;

  const correctCount = data.questions.filter(q => q.QuesScore >= 60).length;

  const accuracy =
    Math.round(
      data.questions.reduce((a, q) => a + (q.accuracy || 0), 0) /
        data.questions.length
    ) || 0;

  const avgConfidence =
    Math.round(
      data.questions.reduce((a, q) => a + (q.ConfidenceScore || 0), 0) /
        data.questions.length
    ) || 0;

  const handlePrint = () => window.print();

  return (
    <div className="assessment-container">
      {/* ACTION BAR */}
      <div className="history-actionBar">
        <button className="history-btn primary" onClick={handlePrint}>
          🖨 Print / Download Report
        </button>
      </div>

      {/* PRINTABLE REPORT */}
      <div ref={reportRef}>
        {/* HEADER */}
        <div className="assessment-header">
          <span className="badge">Interview Complete</span>
          <h1>{data.headline} Assessment</h1>
          <p>{new Date(data.date).toLocaleString()}</p>
        </div>

        {/* SCORE SECTION */}
        <div className="assessment-scoreSection">
          <div className="circle-score">
            <svg>
              <circle cx="70" cy="70" r="60" />
              <circle
                cx="70"
                cy="70"
                r="60"
                style={{
                  strokeDasharray: 377,
                  strokeDashoffset: 377 - (377 * data.score) / 100
                }}
              />
            </svg>
            <div className="circle-text">
              <h2>{Math.round(data.score)}%</h2>
              <span>Overall Score</span>
            </div>
          </div>

          <div className="stat-cards">
            <div className="stat-card danger">
              <span>Needs Improvement</span>
              <h3>{accuracy}%</h3>
              <p>Accuracy</p>
            </div>

            <div className="stat-card success">
              <span>Good</span>
              <h3>{data.emotion}%</h3>
              <p>Emotional IQ</p>
            </div>

            <div className="stat-card success">
              <span>Good</span>
              <h3>{avgConfidence}%</h3>
              <p>Avg Confidence</p>
            </div>
          </div>
        </div>

        <p className="answered-text">
          You answered {correctCount} out of {data.questions.length} questions correctly
        </p>

        {/* QUESTION LIST */}
        <div className="question-section">
          <h2>Question Breakdown</h2>

          {data.questions.map((q, i) => {
            const isCorrect = q.QuesScore >= 60;
            return (
              <div key={i} className="question-card">
                <div
                  className="question-header"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="question-left">
                    <span className="q-index">{i + 1}</span>
                    <span>{q.questionText}</span>
                  </div>

                  <div className="question-right">
                    <span className={`status ${isCorrect ? "correct" : "incorrect"}`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                    <span className="percent">{q.QuesScore}%</span>
                    <span className="arrow">{openIndex === i ? "▲" : "▼"}</span>
                  </div>
                </div>

                {openIndex === i && (
                  <div className="question-body">
                    <p><b>Your Answer:</b> {q.userAnswer}</p>
                    <p><b>Correct Answer:</b> {q.correctAnswer}</p>
                    <p><b>Accuracy:</b> {q.accuracy}%</p>
                    <p><b>Confidence:</b> {q.ConfidenceScore}%</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
