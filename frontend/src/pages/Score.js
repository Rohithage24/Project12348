import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.result?.test;
// console.log(results);

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

  // ---------------- SAFE EARLY RETURN ----------------
  if (!results) {
    return (
      <div className="score-container">
        <h2>No Score Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="score-container">
      <h1 className="score-heading">📊 Interview Results</h1>

      {/* SUMMARY */}
      <div className="score-summaryCard">
        <h2>{results.headline || "Unknown Topic"}</h2>

        <div className="score-summaryMeta">
          <div className="score-summaryBox">
            Score: {results.score ?? "N/A"}
          </div>
          <div className="score-summaryBox">
            Date: {results.date ? new Date(results.date).toLocaleString() : "N/A"}
          </div>
        </div>
      </div>

      {/* AI TYPING REMARK */}
      <div className="score-remarkBox">
        🤖 {typedRemark}
      </div>

      {/* QUESTIONS */}
      {results.questions?.length > 0 && (
        <div className="score-card">
          <h3 className="score-subHeading">Question Breakdown</h3>

          <ul className="score-questionList">
            {results.questions.map((q, idx) => (
              <li key={idx} className="score-questionItem">
                <p className="score-label">Question:</p>
                <p>{q.questionText}</p>

                <p className="score-label">Your Answer:</p>
                <div className="score-answerBox">{q.userAnswer}</div>

                <p className="score-label">Correct Answer:</p>
                <div className="score-correctBox">{q.correctAnswer}</div>

                {/* Only Accuracy + Overall Speech Confidence */}
                <div className="score-miniStats">
                  <div className="score-miniBox">
                    🎯 Accuracy: {q.accuracy ?? "N/A"}%
                  </div>
                  <div className="score-miniBox">
                    🎤 Speech Confidence: {q.ConfidenceScore ?? "N/A"}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* OVERALL ANALYSIS */}
      <div className="score-overallSection">
        <h2>📈 Overall Performance Analysis</h2>

        <div className="score-overallGrid">
          <div className="score-overallBox">
            😐 Face Confidence
            <br />
            {results.emotion !== null && (
              <div
                className="score-progressBar"
                style={{ "--target-width": `${results.emotion}%` }}
              >
                <div className="score-progressFill"></div>
              </div>
            )}
          </div>

          <div className="score-overallBox">
            🎤 Overall Voice Confidence
            <br />
            {overallVoiceConfidence !== null ? `${overallVoiceConfidence}%` : "N/A"}

            {overallVoiceConfidence !== null && (
              <div
                className="score-progressBar"
                style={{ "--target-width": `${overallVoiceConfidence}%` }}
              >
                <div className="score-progressFill"></div>
              </div>
            )}

            <p>{voiceRemark}</p>
          </div>

          <div className="score-overallBox">
            ⚡ Overall Efficiency
            <br />
            {overallEfficiency !== null ? `${overallEfficiency}%` : "N/A"}

            {overallEfficiency !== null && (
              <div
                className="score-progressBar"
                style={{ "--target-width": `${overallEfficiency}%` }}
              >
                <div className="score-progressFill"></div>
              </div>
            )}

            <p>{efficiencyRemark}</p>
          </div>
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