import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.result?.test;

  // ---------------- REMARK (BASED ON SCORE) ----------------
  const score = results?.score ?? 0;
  let remarkText = "Good attempt! Keep practicing to improve your confidence.";

  if (score >= 80) {
    remarkText = "Excellent performance! You showed strong confidence and accuracy.";
  } else if (score >= 60) {
    remarkText = "Good job! Try to improve your clarity and speaking style.";
  } else if (score >= 40) {
    remarkText = "Average performance. Focus on speaking clearly and structuring your answers.";
  } else {
    remarkText = "Needs improvement. Revise concepts and practice speaking confidently.";
  }

  // ---------------- AI TYPING EFFECT ----------------
  const [typedRemark, setTypedRemark] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTypedRemark("");
    setIndex(0);
  }, [remarkText]);

  useEffect(() => {
    if (index < remarkText.length) {
      const timeout = setTimeout(() => {
        setTypedRemark((prev) => prev + remarkText.charAt(index));
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index, remarkText]);

  // ---------------- OVERALL VOICE CONFIDENCE ----------------
  const voiceScores =
    results?.questions
      ?.map((q) => q.ConfidenceScore)
      .filter((v) => typeof v === "number") || [];

  const overallVoiceConfidence =
    voiceScores.length > 0
      ? Math.round(
          voiceScores.reduce((a, b) => a + b, 0) / voiceScores.length
        )
      : null;

  // ---------------- VOICE CONFIDENCE REMARK ----------------
  let voiceRemark = "Speech data not available.";

  if (overallVoiceConfidence !== null) {
    if (overallVoiceConfidence >= 80) {
      voiceRemark = "Very confident speech. Keep it up!";
    } else if (overallVoiceConfidence >= 60) {
      voiceRemark = "Good confidence, try to speak more clearly.";
    } else if (overallVoiceConfidence >= 40) {
      voiceRemark = "Try speaking louder and with better clarity.";
    } else {
      voiceRemark = "Low voice confidence. Practice speaking clearly and confidently.";
    }
  }

  // ---------------- OVERALL EFFICIENCY ----------------
  const efficiencyScores =
    results?.questions
      ?.map(
        (q) =>
          q.efficiency ??
          ((q.accuracy ?? 0 + (q.ConfidenceScore ?? 0)) / 2)
      )
      .filter((v) => typeof v === "number") || [];

  const overallEfficiency =
    efficiencyScores.length > 0
      ? Math.round(efficiencyScores.reduce((a, b) => a + b, 0) / efficiencyScores.length)
      : null;

  let efficiencyRemark = "Efficiency data not available.";

  if (overallEfficiency !== null) {
    if (overallEfficiency >= 80) {
      efficiencyRemark = "Outstanding performance! Very efficient responses.";
    } else if (overallEfficiency >= 60) {
      efficiencyRemark = "Good efficiency. Can improve clarity and timing.";
    } else if (overallEfficiency >= 40) {
      efficiencyRemark = "Average efficiency. Work on speed and clarity.";
    } else {
      efficiencyRemark = "Low efficiency. Focus on structured and clear answers.";
    }
  }

  if (!results) {
    return (
      <div className="score-container error-view">
        <div className="glass-card text-center">
          <h2 className="text-white">No Score Data Found</h2>
          <button className="cosmic-btn mt-3" onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="score-page-wrapper">
      <div className="score-container">
        <h1 className="score-heading">📊 Performance Report</h1>

        {/* TOP SUMMARY CARD */}
        <div className="score-summaryCard glass-panel">
          <div className="summary-header">
            <h2 className="topic-title">{results.headline || "Unknown Topic"}</h2>
            <div className="main-score-circle">
               <span className="score-number">{results.score ?? "0"}</span>
               <span className="score-label">OVERALL</span>
            </div>
          </div>
          <p className="score-date">📅 {results.date ? new Date(results.date).toLocaleString() : "N/A"}</p>
        </div>

        {/* AI FEEDBACK BOX */}
        <div className="score-remarkBox glass-panel ai-glow">
          <div className="ai-icon">🤖 AI Analysis:</div>
          <p className="typed-text">{typedRemark}<span className="cursor">|</span></p>
        </div>

        {/* DETAILED ANALYSIS SECTION */}
        <div className="score-overallSection">
          <h2 className="section-title">📈 Metric Breakdown</h2>
          <div className="score-overallGrid">
            
            <div className="score-overallBox glass-panel">
              <p className="metric-name">😐 Face confidence</p>
              <h3 className="metric-value">{results.emotion ?? 0}%</h3>
              <div className="score-progressBar">
                <div className="score-progressFill" style={{ width: `${results.emotion ?? 0}%` }}></div>
              </div>
            </div>

            <div className="score-overallBox glass-panel">
              <p className="metric-name">🎤 Voice Confidence</p>
              <h3 className="metric-value">{overallVoiceConfidence ?? 0}%</h3>
              <div className="score-progressBar">
                <div className="score-progressFill voice-fill" style={{ width: `${overallVoiceConfidence ?? 0}%` }}></div>
              </div>
              <p className="metric-remark">{voiceRemark}</p>
            </div>

            <div className="score-overallBox glass-panel">
              <p className="metric-name">⚡ Response Efficiency</p>
              <h3 className="metric-value">{overallEfficiency ?? 0}%</h3>
              <div className="score-progressBar">
                <div className="score-progressFill eff-fill" style={{ width: `${overallEfficiency ?? 0}%` }}></div>
              </div>
              <p className="metric-remark">{efficiencyRemark}</p>
            </div>

          </div>
        </div>

        {/* QUESTIONS REVIEW SECTION */}
      {results.questions?.length > 0 && (
        <div className="score-details-wrapper">
          <div className="section-divider">
            <span className="divider-line"></span>
            <h3 className="section-title">Deep Dive Review</h3>
            <span className="divider-line"></span>
          </div>

          <div className="score-question-grid">
            {results.questions.map((q, idx) => (
              <div key={idx} className="score-q-card glass-panel">
                
                {/* Header: Question Number & Accuracy Badge */}
                <div className="q-card-header">
                  <div className="q-number-circle">{idx + 1}</div>
                  <div className="q-stats-row">
                    <span className="stat-badge accuracy">
                      <i className="icon-target"></i> {q.accuracy ?? 0}% Accuracy
                    </span>
                    <span className="stat-badge speech">
                      <i className="icon-mic"></i> {q.ConfidenceScore ?? 0}% Confidence
                    </span>
                  </div>
                </div>

                <h4 className="q-text-display">{q.questionText}</h4>

                <div className="comparison-container">
                  {/* User Answer Block */}
                  <div className="comparison-box user-side">
                    <label className="box-label">Your Response</label>
                    <p className="box-content">{q.userAnswer || "No answer recorded."}</p>
                  </div>

                  {/* Correct Answer Block */}
                  <div className="comparison-box mentor-side">
                    <label className="box-label">Expert Reference</label>
                    <p className="box-content">{q.correctAnswer}</p>
                  </div>
                </div>

                {/* Optional: Visual separator for the next card */}
                <div className="card-footer-glow"></div>
              </div>
            ))}
          </div>
        </div>
      )}
        
        <div className="footer-actions">
           <button className="cosmic-btn primary" onClick={() => navigate("/")}>Return Home</button>
        </div>
      </div>
    </div>
  );
};

export default Score;








// // src/pages/Score.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Score = () => {
//   const { userId } = useParams();
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_BACKEND}/record/textRecords/${userId}`,
//           { method: "GET",
//              credentials: 'include',
//              headers: { "Content-Type": "application/json" }
//              }
//         );
//         const data = await res.json();
//         setResults(data);
//       } catch (err) {
//         console.error("Error fetching scores:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScores();
//   }, [userId]);

//   if (loading) return <h2 className="score-loading">Loading Scores...</h2>;

//   if (!results || results.length === 0) {
//     return <h2 className="score-loading">No Score Data Found</h2>;
//   }

//   return (
//     <div className="score-container">
//       <h1 className="score-heading">📊 Your Test Results</h1>

//       {results.map((result, index) => (
//         <div key={index} className="score-card">
//           <h2 className="score-topic">{result.topicName || "Unknown Topic"}</h2>
//           <p><b>Score:</b> {result.score ?? "N/A"}</p>
//           <p><b>Date:</b> {result.date ? new Date(result.date).toLocaleString() : "N/A"}</p>

//           {result.questions && result.questions.length > 0 && (
//             <>
//               <h3 className="score-subHeading">Questions:</h3>
//               <ul className="score-questionList">
//                 {result.questions.map((q, idx) => (
//                   <li key={idx} className="score-questionItem">
//                     <p><b>Q:</b> {q.questionText}</p>
//                     <p><b>Your Answer:</b> {q.userAnswer}</p>
//                     <p><b>Correct Answer:</b> {q.correctAnswer}</p>
//                     <p><b>Score:</b> {q.QuesScore}</p>
//                     <p><b>Accuracy:</b> {q.accuracy}%</p>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Score;