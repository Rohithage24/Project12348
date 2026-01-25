import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Loading from "./Loading";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function InterviewQA({ topic }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [auth] = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [readyForAnswer, setReadyForAnswer] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const navigate = useNavigate();

  /* ---------------- FETCH QUESTIONS ---------------- */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/question/questiona/React",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
          }
        );

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [topic]);

  /* ---------------- SPEAK QUESTION + START RECORDING ---------------- */
  useEffect(() => {
    if (
      questions.length === 0 ||
      currentIndex >= questions.length ||
      !questions[currentIndex]?.questionText
    ) return;

    SpeechRecognition.stopListening();
    resetTranscript();

    const utterance = new SpeechSynthesisUtterance(
      questions[currentIndex].questionText
    );

    utterance.onend = async () => {
      resetTranscript();
      setReadyForAnswer(true);

      // 🎙️ Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.start();
      SpeechRecognition.startListening({ continuous: true });
    };

    window.speechSynthesis.speak(utterance);
  }, [currentIndex, questions, resetTranscript]);

  /* ---------------- SUBMIT ANSWER ---------------- */
const handleSubmit = async () => {
  if (!transcript.trim()) return;

  try {
    setLoading(true);

    SpeechRecognition.stopListening();

    // ✅ WAIT for recorder to stop properly
    const audioBlob = await new Promise((resolve, reject) => {
      if (!mediaRecorderRef.current) {
        reject("Recorder not initialized");
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm"
        });
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });

    // 🔍 DEBUG: confirm audio size
    console.log("Audio size:", audioBlob.size); // MUST be > 0

    // 📤 Send audio to FastAPI
    const formData = new FormData();
    formData.append("file", audioBlob, "answer.webm");
    console.log(formData);

    const confidenceRes = await fetch(
      "http://127.0.0.1:8001/analyze-full-speech",
      {
        method: "POST",
        body: formData
      }
    );
    
    const confidenceData = await confidenceRes.json();
    console.log("Confidence API response:", confidenceData);

    const confidence = confidenceData?.overall_score ?? 0;
    setConfidenceScore(confidence);

    // ✅ FINAL PAYLOAD
    const payload = {
      userId: auth.user._id,
      question: questions[currentIndex].questionText,
      answer: transcript.trim(),
      confidenceScore: confidence,
      allConfindance : confidenceData,

    };

    console.log("Submitting payload:", payload);

    await fetch("http://localhost:4000/api/record/audio-text", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    resetTranscript();
    setReadyForAnswer(false);

    if (currentIndex + 1 < questions.length) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 800);
    }

  } catch (error) {
    console.error("Failed to submit answer:", error);
  } finally {
    setLoading(false);
  }
};


  /* ---------------- FINAL SUBMIT ---------------- */
  const SubmitExam = async () => {
    await handleSubmit();

    try {
       const responseEmo = await fetch(
        `${process.env.REACT_APP_BACKEND}/calEmo`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const dataEmo = await responseEmo.json();
      console.log("Emotion data ",dataEmo);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/record/submitExam`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: auth.user._id,
            headline: topic
          })
        }
      );

      

      const data = await response.json();
      console.log(data);

      if (data) navigate("/score", { state: { result: data } });

    } catch (error) {
      console.error("Submit exam error:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn’t support speech recognition.</span>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: "20px" }}>
      <h1>Interview Q&A</h1>

      {questions.length > 0 && currentIndex < questions.length ? (
        <>
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <strong>{questions[currentIndex]?.questionText}</strong>

          {readyForAnswer && (
            <div style={{ marginTop: "20px" }}>
              <p>Microphone: {listening ? "ON 🎙️" : "OFF"}</p>
              <p>Your answer: {transcript}</p>

              {confidenceScore !== null && (
                <p><b>Confidence Score:</b> {confidenceScore}%</p>
              )}

              {currentIndex + 1 < questions.length ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Submit Answer"}
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={SubmitExam}
                  disabled={loading}
                >
                  {loading ? "Finishing..." : "Complete Interview"}
                </button>
              )}
            </div>
          )}
        </>
      ) : questions.length > 0 && currentIndex >= questions.length ? (
        <p>✅ Interview complete!</p>
      ) : (
        <Loading />
      )}
    </div>
  );
}





// import React, { useEffect, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import Loading from "./Loading";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";

// export default function InterviewQA({ topic }) {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();
//   const [auth , setAuth] = useAuth();
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [readyForAnswer, setReadyForAnswer] = useState(false);
//   const navigate = useNavigate();
//   // console.log(auth);
  
//   // Fetch questions from backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         // const response = await fetch(`${process.env.REACT_APP_BACKEND}/agentChat/chat`, {
//         const response = await fetch(`http://localhost:4000/api/question/questiona/React`, {
//           method: "GET",
//           credentials:"include",
//           headers: { "Content-Type": "application/json" },
          
//         });

//         const data = await response.json();
//         console.log(data);
        
//         // const cleanedJson = data.reply.replace(/```json|```/g, "").trim();
//         // const parsedQuestions = JSON.parse(cleanedJson);

//         setQuestions(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [topic]);

//   // Speak current question
//   // useEffect(() => {
//   //   if (questions.length === 0 || currentIndex >= questions.length) return;

//   //   SpeechRecognition.stopListening();
//   //   resetTranscript();

//   //   const question = questions[currentIndex].question;
//   //   const utterance = new SpeechSynthesisUtterance(question);
//   //   utterance.rate = 1;
//   //   utterance.pitch = 1;

//   //   utterance.onend = () => {
//   //     resetTranscript();
//   //     setReadyForAnswer(true);
//   //     SpeechRecognition.startListening({ continuous: true });
//   //   };

//   //   window.speechSynthesis.speak(utterance);
//   // }, [currentIndex, questions, resetTranscript]);


//   useEffect(() => {
//   if (
//     questions.length === 0 ||
//     currentIndex >= questions.length ||
//     !questions[currentIndex]?.questionText
//   ) return;

//   SpeechRecognition.stopListening();
//   resetTranscript();

//   const utterance = new SpeechSynthesisUtterance(
//     questions[currentIndex].questionText
//   );

//   utterance.onend = () => {
//     resetTranscript();
//     setReadyForAnswer(true);
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   window.speechSynthesis.speak(utterance);
// }, [currentIndex, questions]);


//   // Submit answer
//   const handleSubmit = async () => {
//     if (!transcript.trim()) return;

//     try {
//       setLoading(true);

//       const payload = {
//         userId : auth.user._id,
//         question : questions[currentIndex].questionText,
//         answer: transcript.trim()
//       };

//       console.log(payload);
      

//       // await fetch(`${process.env.REACT_APP_BACKEND}/record/audio-text`, {
//        await fetch(`http://localhost:4000/api/record/audio-text`, {

//         method: "POST",
//          credentials: 'include',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       SpeechRecognition.stopListening();
//       resetTranscript();
//       setReadyForAnswer(false);

//       if (currentIndex + 1 < questions.length) {
//         setTimeout(() => {
//           setCurrentIndex((prev) => prev + 1);
//         }, 800);
//       } else {
//         console.log("✅ Interview complete! You can now save results.");
//       }
//     } catch (error) {
//       console.error("Failed to send:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn’t support speech recognition.</span>;
//   }

//   const SubmitExam = async()=>{
//     handleSubmit();
//     let userId = auth.user._id;
//     let headline = topic;
//     try {
//        const response = await fetch(`${process.env.REACT_APP_BACKEND}/record/submitExam`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ userId, headline  })
//         });

//         const data = await response.json();
//       console.log(data);

//       if(data){
//         navigate('/score',{ state: { result: data } })
//       }
      
//     } catch (error) {
//        console.error("Error fetching questions:", error);
//     }

//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Interview Q&A</h1>

//       {questions.length > 0 && currentIndex < questions.length ? (
//         <>
//           <p>
//             Question {currentIndex + 1} of {questions.length}:
//           </p>
//           <strong>{questions[currentIndex]?.questionText}</strong>

//           {readyForAnswer && (
//             <div style={{ marginTop: "20px" }}>
//               <p>Microphone: {listening ? "on" : "off"}</p>
//               <p>Your answer: {transcript}</p>

//               {currentIndex + 1 < questions.length ? (
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSubmit}
//                   disabled={loading}
//                 >
//                   {loading ? "Sending..." : "Submit Answer"}
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-success"
//                   onClick={SubmitExam}
//                   disabled={loading}
//                 >
//                   {loading ? "Finishing..." : "Complete Interview"}
//                 </button>
//               )}
//             </div>
//           )}
//         </>
//       ) : questions.length > 0 && currentIndex >= questions.length ? (
//         <p>✅ Interview complete! Well done.</p>
//       ) : (
//         <Loading />
//       )}
//     </div>
//   );
// }


