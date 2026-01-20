import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [readyToRecord, setReadyToRecord] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Start recording after 10 seconds
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    const timer = setTimeout(() => {
      setReadyToRecord(true);
      SpeechRecognition.startListening({ continuous: true });
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [browserSupportsSpeechRecognition]);

  // Step 2: Submit current transcript manually
  const handleSubmit = async () => {
    if (!transcript.trim()) return; // Don't send empty

    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BACKEND}/record/audio-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ message: transcript.trim() })
      });

      if (response.ok) {
        console.log('Backend accepted:', transcript.trim());

        // Step 3: Reset transcript and start next sentence recording
        resetTranscript();
        SpeechRecognition.stopListening(); // stop old session
        setTimeout(() => {
          SpeechRecognition.startListening({ continuous: true });
        }, 300); // small gap
      } else {
        console.error('Backend error:', await response.text());
      }
    } catch (error) {
      console.error('Failed to send:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn’t support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {!readyToRecord && <p>Waiting 10 seconds before starting...</p>}
      {readyToRecord && (
        <>
          <p>Speak your sentence, then click Submit.</p>
          <p>Current sentence: {transcript}</p>
          <button className='btn btn-primary' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </>
      )}
    </div>
  );
};

export default VoiceAssistant;




// import React, { useEffect, useState, useRef } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const VoiceAssistant = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   const [activated, setActivated] = useState(false);
//   const [lastProcessed, setLastProcessed] = useState('');
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) return;

//     // Start listening immediately when page loads
//     SpeechRecognition.startListening({ continuous: true });
//   }, [browserSupportsSpeechRecognition]);

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();
//     console.log(lowerTranscript);
    

//     // Step 1: Detect activation phrase
//     if (!activated && (lowerTranscript.includes("good morning sir") || lowerTranscript.includes("yes sir"))) {
//       console.log("Activation phrase detected");
//       setActivated(true);
//       resetTranscript();
//     }

//     // Step 2: After activation, process transcript
//     if (activated && transcript !== lastProcessed) {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       // Wait for pause (sentence likely done) — 1.2 seconds after last speech
//       timeoutRef.current = setTimeout(() => {
//         const cleanedSentence = transcript.trim();
//         if (cleanedSentence && cleanedSentence !== lastProcessed) {
//           sendToBackend(cleanedSentence);
//           setLastProcessed(cleanedSentence);
//           resetTranscript();
//         }
//       }, 1200); // 1.2 seconds of silence means sentence done
//     }
//   }, [transcript, activated, lastProcessed, resetTranscript]);

//   const sendToBackend = async (sentence) => {
//     try {
//       console.log("Sending:", sentence);
//      const data = await fetch('http://localhost:4000/audio-text', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message: sentence })
//       });

//       console.log(data);
      
//     } catch (error) {
//       console.error("Failed to send:", error);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <p>{activated ? "Listening for sentences..." : "Say 'good morning sir' or 'yes sir' to activate"}</p>
//       <p>Current sentence: {transcript}</p>
//     </div>
//   );
// };

// export default VoiceAssistant;








// import React, { useEffect, useState, useRef } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const VoiceAssistant = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   const [activated, setActivated] = useState(false);
//   const [lastProcessed, setLastProcessed] = useState('');
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (!browserSupportsSpeechRecognition) return;

//     // Start listening immediately when page loads
//     SpeechRecognition.startListening({ continuous: true });
//   }, [browserSupportsSpeechRecognition]);

//   useEffect(() => {
//     const lowerTranscript = transcript.toLowerCase();
//     console.log(lowerTranscript);
    

//     // Step 1: Detect activation phrase
//     if (!activated && (lowerTranscript.includes("good morning sir") || lowerTranscript.includes("yes sir"))) {
//       console.log("Activation phrase detected");
//       setActivated(true);
//       resetTranscript();
//     }

//     // Step 2: After activation, process transcript
//     if (activated && transcript !== lastProcessed) {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       // Wait for pause (sentence likely done) — 1.2 seconds after last speech
//       timeoutRef.current = setTimeout(() => {
//         const cleanedSentence = transcript.trim();
//         if (cleanedSentence && cleanedSentence !== lastProcessed) {
//           sendToBackend(cleanedSentence);
//           setLastProcessed(cleanedSentence);
//           resetTranscript();
//         }
//       }, 1200); // 1.2 seconds of silence means sentence done
//     }
//   }, [transcript, activated, lastProcessed, resetTranscript]);

//   const sendToBackend = async (sentence) => {
//     try {
//       console.log("Sending:", sentence);
//      const data = await fetch('http://localhost:4000/audio-text', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message: sentence })
//       });

//       console.log(data);
      
//     } catch (error) {
//       console.error("Failed to send:", error);
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <p>{activated ? "Listening for sentences..." : "Say 'good morning sir' or 'yes sir' to activate"}</p>
//       <p>Current sentence: {transcript}</p>
//     </div>
//   );
// };

// export default VoiceAssistant;



