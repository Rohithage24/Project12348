import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import EmotionDetection from "../components/EmotionDetection";
import InterviewQA from "../components/InterviewQA";
import Loading from "../components/Loading";
import Lottie from "lottie-react";
import assistantAnimation from "../animations/assistant2.json"; // Lottie JSON
import "../IntervewPage.css"; // <-- CSS directly under src

const IntervewPage = () => {
  const [auth] = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!auth.user) navigate("/");
  }, [auth, navigate]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/topic/topicone/${id}`,
          { method: "GET", 
             credentials: 'include',
            headers: { "Content-Type": "application/json" } }
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

  if (loading) return <h2><Loading /></h2>;
  if (!topic) return <h2>No topic found</h2>;

  return (
    <div className="interview-page">
      <h1>{topic?.Headline}</h1>
      <div className="container interbox col-md-11 mx-auto">
        {/* Left side: Lottie assistant animation */}
        <div className="agint col-md-5">
          <Lottie animationData={assistantAnimation} loop={true} />
        </div>

        {/* Right side: Emotion detection + Q&A */}
        <div className="voice col-md-3">
          <EmotionDetection />
          <InterviewQA topic={topic?.title} />
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
