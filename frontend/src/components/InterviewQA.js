import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Loading from "./Loading";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function InterviewQA({ topic }) {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [auth , setAuth] = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [readyForAnswer, setReadyForAnswer] = useState(false);
  const navigate = useNavigate();
  // console.log(auth);
  
  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `give only question ${topic} interview Question now the number of question is 5 , Now the formate in json array fromate`
          })
        });

        const data = await response.json();
        const cleanedJson = data.reply.replace(/```json|```/g, "").trim();
        const parsedQuestions = JSON.parse(cleanedJson);

        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [topic]);

  // Speak current question
  useEffect(() => {
    if (questions.length === 0 || currentIndex >= questions.length) return;

    SpeechRecognition.stopListening();
    resetTranscript();

    const question = questions[currentIndex].question;
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      resetTranscript();
      setReadyForAnswer(true);
      SpeechRecognition.startListening({ continuous: true });
    };

    window.speechSynthesis.speak(utterance);
  }, [currentIndex, questions, resetTranscript]);

  // Submit answer
  const handleSubmit = async () => {
    if (!transcript.trim()) return;

    try {
      setLoading(true);

      const payload = {
        userId : auth.user._id,
        question: questions[currentIndex].question,
        answer: transcript.trim()
      };

      await fetch(`${process.env.REACT_APP_BACKEND}/audio-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      SpeechRecognition.stopListening();
      resetTranscript();
      setReadyForAnswer(false);

      if (currentIndex + 1 < questions.length) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 800);
      } else {
        console.log("✅ Interview complete! You can now save results.");
      }
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn’t support speech recognition.</span>;
  }

  const SubmitExam = async()=>{
    handleSubmit();
    let userId = auth.user._id;
    let headline = topic;
    try {
       const response = await fetch(`${process.env.REACT_APP_BACKEND}/submitExam`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, headline  })
        });

        const data = await response.json();
      console.log(data);

      if(data){
        navigate('/score',{ state: { result: data } })
      }
      
    } catch (error) {
       console.error("Error fetching questions:", error);
    }

  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interview Q&A</h1>

      {questions.length > 0 && currentIndex < questions.length ? (
        <>
          <p>
            Question {currentIndex + 1} of {questions.length}:
          </p>
          <strong>{questions[currentIndex]?.question}</strong>

          {readyForAnswer && (
            <div style={{ marginTop: "20px" }}>
              <p>Microphone: {listening ? "on" : "off"}</p>
              <p>Your answer: {transcript}</p>

              {currentIndex + 1 < questions.length ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit Answer"}
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
        <p>✅ Interview complete! Well done.</p>
      ) : (
        <Loading />
      )}
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import Loading from "./Loading";

// export default function InterviewQA({ topic }) {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [readyForAnswer, setReadyForAnswer] = useState(false);
//   const [completed, setCompleted] = useState(false);

//   // Step 1: Fetch questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_BACKEND}/chat`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             message: `give only question ${topic} interview Question now the number of question is 5 , Now the formate in json array fromate`
//           })
//         });

//         const data = await response.json();
//         const cleanedJson = data.reply.replace(/```json|```/g, "").trim();
//         const parsedQuestions = JSON.parse(cleanedJson);

//         setQuestions(parsedQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [topic]);

//   // Step 2: Speak current question
//   useEffect(() => {
//     if (questions.length === 0 || currentIndex >= questions.length) return;

//     SpeechRecognition.stopListening();
//     resetTranscript();

//     const question = questions[currentIndex].question;
//     const utterance = new SpeechSynthesisUtterance(question);
//     utterance.rate = 1;
//     utterance.pitch = 1;

//     utterance.onend = () => {
//       resetTranscript();
//       setReadyForAnswer(true);
//       SpeechRecognition.startListening({ continuous: true });
//     };

//     window.speechSynthesis.speak(utterance);
//   }, [currentIndex, questions, resetTranscript]);

//   // Step 3: Submit answer
//   const handleSubmit = async () => {
//     if (!transcript.trim()) return;

//     try {
//       setLoading(true);

//       const payload = {
//         question: questions[currentIndex].question,
//         answer: transcript.trim()
//       };

//       await fetch(`${process.env.REACT_APP_BACKEND}/audio-text`, {
//         method: "POST",
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
//         // Last question answered
//         setCompleted(true);
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

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Interview Q&A</h1>

//       {questions.length > 0 && !completed ? (
//         <>
//           <p>
//             Question {currentIndex + 1} of {questions.length}:
//           </p>
//           <strong>{questions[currentIndex]?.question}</strong>

//           {readyForAnswer && (
//             <div style={{ marginTop: "20px" }}>
//               <p>Microphone: {listening ? "on" : "off"}</p>
//               <p>Your answer: {transcript}</p>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? "Sending..." : currentIndex + 1 === questions.length ? "Complete Interview" : "Submit Answer"}
//               </button>
//             </div>
//           )}
//         </>
//       ) : completed ? (
//         <p>✅ Interview complete! Well done.</p>
//       ) : (
//         <Loading />
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import Loading from "./Loading";

// export default function InterviewQA(topic) {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
//     useSpeechRecognition();
 
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [readyForAnswer, setReadyForAnswer] = useState(false);

//   console.log(topic);
  

//   // Step 1: Fetch questions from backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_BACKEND}/chat`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             message:
//               `give only question ${topic} interview Question now the number of question is 5 , Now the formate in json array fromate`
//           })
//         });

//         const data = await response.json();
//         const cleanedJson = data.reply.replace(/```json|```/g, "").trim();
//         const parsedQuestions = JSON.parse(cleanedJson);

//         setQuestions(parsedQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // Step 2: Speak the current question
//   useEffect(() => {
//     if (questions.length === 0 || currentIndex >= questions.length) return;

//     // Stop any previous listening
//     SpeechRecognition.stopListening();
//     resetTranscript(); // clear old answer

//     const question = questions[currentIndex].question;
//     const utterance = new SpeechSynthesisUtterance(question);
//     utterance.rate = 1;
//     utterance.pitch = 1;

//     utterance.onend = () => {
//       resetTranscript(); // clear again before listening
//       setReadyForAnswer(true);
//       SpeechRecognition.startListening({ continuous: true });
//     };

//     window.speechSynthesis.speak(utterance);
//   }, [currentIndex, questions]);

//   // Step 3: Submit answer and move to next question
//   const handleSubmit = async () => {
//     if (!transcript.trim()) return;

//     try {
//       setLoading(true);

//       const payload = {
//         question: questions[currentIndex].question,
//         answer: transcript.trim()
//       };

//       await fetch(`${process.env.REACT_APP_BACKEND}/audio-text`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       SpeechRecognition.stopListening();
//       resetTranscript();
//       setReadyForAnswer(false);

//       // Move to next question after short delay
//       setTimeout(() => {
//         setCurrentIndex((prev) => prev + 1);
//       }, 800);
//     } catch (error) {
//       console.error("Failed to send:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn’t support speech recognition.</span>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Interview Q&A</h1>

//       {questions.length > 0 && currentIndex < questions.length ? (
//         <>
//           <p>
//             Question {currentIndex + 1} of {questions.length}:
//           </p>
//           <strong>{questions[currentIndex]?.question}</strong>

//           {readyForAnswer && (
//             <div style={{ marginTop: "20px" }}>
//               <p>Microphone: {listening ? "on" : "off"}</p>
//               <p>Your answer: {transcript}</p>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? "Sending..." : "Submit Answer"}
//               </button>
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
