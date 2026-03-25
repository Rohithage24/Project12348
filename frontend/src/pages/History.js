import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

  if (!data) return <div className="history-loading">Gathering Intelligence...</div>;

  const correctCount = data.questions.filter(q => q.QuesScore >= 60).length;
  const accuracy = data.score
  const avgConfidence = Math.round(data.questions.reduce((a, q) => a + (q.ConfidenceScore || 0), 0) / data.questions.length) || 0;

  const handlePrint = () => window.print();

  return (
    <div className="dashboard-container history-page">
      {/* ACTION BAR */}
      <div className="history-header-row" style={{justifyContent: 'space-between', marginBottom: '30px'}}>
        <div>
          <span className="badge-ai">Assessment ID: #{id?.slice(-6)}</span>
          <h1 style={{marginTop: '10px'}}>{data.headline} Report</h1>
          <p style={{color: 'var(--text-dim)'}}>{new Date(data.date).toLocaleDateString()} • {new Date(data.date).toLocaleTimeString()}</p>
        </div>
        <button className="cta-btn" onClick={handlePrint}>
          <span>📥 Download PDF</span>
        </button>
      </div>

      <div ref={reportRef} className="printable-content">
        {/* TOP STATS GRID */}
        <div className="dashboard-stats" style={{marginBottom: '40px'}}>
           <div className="dashboard-stat">
             <div style={{width: 80, height: 80, margin: '0 auto 10px'}}>
               <CircularProgressbar 
                  value={data.score} 
                  text={`${Math.round(data.score)}%`} 
                  styles={buildStyles({ pathColor: 'var(--accent-blue)', textColor: '#fff', trailColor: 'rgba(255,255,255,0.1)' })}
               />
             </div>
             <p>Overall Score</p>
           </div>
           
           <div className="dashboard-stat" style={{borderLeft: '2px solid var(--accent-purple)'}}>
             <h3>{accuracy}%</h3>
             <p>Score</p>
           </div>

           <div className="dashboard-stat" style={{borderLeft: '2px solid #4ade80'}}>
             <h3>{data.emotion}%</h3>
             <p>Emotional IQ</p>
           </div>

           <div className="dashboard-stat" style={{borderLeft: '2px solid #facc15'}}>
             <h3>{avgConfidence}%</h3>
             <p>Confidence</p>
           </div>
        </div>

        <div className="glass-card" style={{padding: '20px', textAlign: 'center', marginBottom: '30px', background: 'rgba(255,255,255,0.02)'}}>
           <p style={{margin: 0, fontSize: '1.1rem'}}>
             Performance Analysis: <span style={{color: 'var(--accent-blue)'}}>{correctCount} / {data.questions.length}</span> questions cleared the benchmark.
           </p>
        </div>

        {/* ACCORDION QUESTIONS */}
        <div className="question-section">
          <h2 style={{marginBottom: '20px', fontSize: '1.4rem'}}>Detailed Breakdown</h2>
          
          {data.questions.map((q, i) => {
            const isCorrect = q.QuesScore >= 60;
            return (
              <div key={i} className={`history-card ${openIndex === i ? 'open' : ''}`}>
                <div className="history-card-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <div className="q-info">
                    <span className="q-number">{i + 1}</span>
                    <span className="q-text">{q.questionText}</span>
                  </div>
                  <div className="q-status-group">
                    <span className={`status-tag ${isCorrect ? 'pass' : 'fail'}`}>
                      {isCorrect ? "PASS" : "FAIL"}
                    </span>
                    <span className="arrow-icon">{openIndex === i ? "▲" : "▼"}</span>
                  </div>
                </div>

                {openIndex === i && (
                  <div className="history-card-body animate-fade">
                    <div className="answer-grid">
                      <div className="answer-box">
                        <label>Your Response</label>
                        <p>{q.userAnswer}</p>
                      </div>
                      <div className="answer-box highlight">
                        <label>Expected Logic</label>
                        <p>{q.correctAnswer}</p>
                      </div>
                    </div>
                    <div className="mini-metrics">
                       <span>Accuracy: <b>{q.accuracy}%</b></span>
                       <span>Confidence: <b>{q.ConfidenceScore}%</b></span>
                    </div>
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