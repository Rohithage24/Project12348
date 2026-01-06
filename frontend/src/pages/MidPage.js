// src/pages/MidPage.js
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Coding from "../animations/Coding.json";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const MidPage = () => {
  const [auth] = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!auth.user) navigate("/");
  }, [auth, navigate]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/topicone/${id}`);
        const data = await res.json();
        setTopic(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/textRecords/${auth.user._id}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [auth.user]);

  const handleClick = () => navigate(`/inter/${id}`);

  if (loading || !topic) return <Loading />;

  return (
    <div className="midpage-container">
      <h1 className="midpage-heading">{topic.Headline}</h1>

      <div className="midpage-topSection">
        <div className="midpage-leftBox">
          <h2 className="midpage-subHeading">🚀 Prepare Confidently</h2>
          <p className="midpage-text">{topic.descriptionlong}</p>
        </div>
        <div className="midpage-rightBox">
          <Lottie animationData={Coding} loop={true} />
        </div>
      </div>

      <div className="midpage-box">
        <button className="midpage-button" onClick={handleClick}>
          ✨ Click Me to Begin!
        </button>
      </div>

      <div className="midpage-historyBox">
        <h2 className="midpage-historyTitle">{topic.emoji} Your Activity History</h2>

        {history && history.length > 0 ? (
          history.slice(-2).reverse().map((record, idx) => (
            <div key={idx} className="midpage-historyItem">
              <p><strong>Test:</strong> {record.topicName || "Unknown Topic"}</p>
              <p><strong>Score:</strong> {record.score ?? "N/A"}</p>
              <p><strong>Date:</strong> {record.date ? new Date(record.date).toLocaleString() : "N/A"}</p>
              <button
                className="midpage-viewAllButton"
                onClick={() => navigate(`/History/${record._id}`)}
              >
                View All Scores
              </button>
            </div>
          ))
        ) : (
          <p className="midpage-textCenter">History will be shown here as you progress.</p>
        )}
      </div>
    </div>
  );
};

export default MidPage;
