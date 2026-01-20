import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract test object from backend response
  const results = location.state?.result?.test;

  console.log(results);

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
      <h1 className="score-heading">📊 Your Test Results</h1>

      <div className="score-card">
        <h2 className="score-topic">{results.headline || "Unknown Topic"}</h2>
        <p><b>Score:</b> {results.score ?? "N/A"}</p>
        <p><b>Date:</b> {results.date ? new Date(results.date).toLocaleString() : "N/A"}</p>

        {results.questions?.length > 0 && (
          <>
            <h3 className="score-subHeading">Questions:</h3>
            <ul className="score-questionList">
              {results.questions.map((q, idx) => (
                <li key={idx} className="score-questionItem">
                  <p><b>Q:</b> {q.questionText}</p>
                  <p><b>Your Answer:</b> {q.userAnswer}</p>
                  <p><b>Correct Answer:</b> {q.correctAnswer}</p>
                  <p><b>Score:</b> {q.QuesScore}</p>
                  <p><b>Accuracy:</b> {q.accuracy}%</p>
                  
                  {q.AllConfindacce && (
                    <div className="confidence-box">
                      <h4>🎤 Confidence Analysis</h4>
                      <p><b>Overall:</b> {q.AllConfindacce.overall_score}%</p>
                      <p><b>Pace:</b> {q.AllConfindacce.pace_score}%</p>
                      <p><b>Clarity:</b> {q.AllConfindacce.clarity_score}%</p>
                      <p><b>Tone:</b> {q.AllConfindacce.tone_score}%</p>
                      <p><b>Pace Feedback:</b> {q.AllConfindacce.pace_feedback}</p>
                      <p><b>Clarity Feedback:</b> {q.AllConfindacce.clarity_feedback}</p>
                      <p><b>Tone Feedback:</b> {q.AllConfindacce.tone_feedback}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
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
