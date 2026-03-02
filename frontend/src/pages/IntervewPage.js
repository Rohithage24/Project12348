import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import EmotionDetection from "../components/EmotionDetection";
import InterviewQA from "../components/InterviewQA";
import Loading from "../components/Loading";
import "../IntervewPage.css";

const IntervewPage = () => {
  const [auth] = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const [Emotion, setEmotion] = useState({});
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (!auth.user) navigate("/");
  }, [auth, navigate]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/topic/topicone/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error("Failed to fetch topic:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  useEffect(() => {
    if (Emotion?.data?.warning_count === 1) {
      setWarningMessage("⚠️ Multiple face detected. You have 2 chances left.");
    } 
    else if (Emotion?.data?.warning_count === 2) {
      setWarningMessage(
        "🚨 Final warning: Multiple face detected. Interview will close next time."
      );
    } 
    else {
      setWarningMessage("");
    }
  }, [Emotion]);

  if (loading) return <Loading />;
  if (!topic) return <h2 className="error-text">No topic found</h2>;

  return (
    <div className="interview-page-container">
      <div className="interview-header">
         <h1 className="interview-title">{topic?.Headline}</h1>
      </div>

      {warningMessage && (
        <div className="interview-warning-box">
          {warningMessage}
        </div>
      )}

      <div className="interview-split-layout">
        {/* Left Section: Camera (Expanded to 60%) */}
        <div className="interview-camera-section expanded">
          <div className="camera-glass-box large-view">
            <EmotionDetection sendEmotion={setEmotion} />
          </div>
        </div>

        {/* Right Section: QA/Questions (40%) */}
        <div className="interview-qa-section condensed">
          <div className="qa-glass-box">
            <InterviewQA
              topic={topic?.title}
              interviewStop={Emotion?.data?.stop_interview === true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntervewPage;





// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';
// import VoiceAssistant from './voice/VoiceLoop';
// import EmotionDetection from '../components/EmotionDetection';
// import InterviewQA from '../components/InterviewQA';


// const IntervewPage = () => {
//   const [auth] = useAuth()
//   const [topic, setTopic] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const [selectedQA, setSelectedQA] = useState(null);
//   const openModal = (qa) => setSelectedQA(qa);
//   const closeModal = () => setSelectedQA(null);

// console.log(process.env.BACKEND);

//   console.log(id);
 
//    useEffect(() => {
//       if (!auth.user) {
//         navigate('/')
//       }
//     }, [auth, navigate])
  
//     useEffect(() => {
//       const fetchTopic = async () => {
//         try {
//           const response = await fetch(`${process.env.REACT_APP_BACKEND}/topicone/${id}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           })
//           const data = await response.json()
//           setTopic(data)
//         } catch (error) {
//           console.error('Failed to fetch topic:', error)
//         } finally {
//           setLoading(false)
//         }
//       }
//       fetchTopic()
//     }, [id])

//     console.log(topic);
    

//   return (
//    <>
//      <h1>{topic.Headline || " "}</h1>
//    <div className='container  interbox col-md-11 mx-auto '>
   
//      <div className='agint col-md-5'>
//       <img src='' />
//      </div>
//      <div className='voice col-md-5'>
//       <EmotionDetection />
//       <InterviewQA topic={topic?.title}  />
//      </div>

//    </div>
   
//    </>
//   );
// };



// export default IntervewPage;
