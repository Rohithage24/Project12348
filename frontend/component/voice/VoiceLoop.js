import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [activated, setActivated] = useState(false);
  const [lastProcessed, setLastProcessed] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    // Start listening immediately when page loads
    SpeechRecognition.startListening({ continuous: true });
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    const lowerTranscript = transcript.toLowerCase();
    console.log(lowerTranscript);
    

    // Step 1: Detect activation phrase
    if (!activated && (lowerTranscript.includes("good morning sir") || lowerTranscript.includes("yes sir"))) {
      console.log("Activation phrase detected");
      setActivated(true);
      resetTranscript();
    }

    // Step 2: After activation, process transcript
    if (activated && transcript !== lastProcessed) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Wait for pause (sentence likely done) — 1.2 seconds after last speech
      timeoutRef.current = setTimeout(() => {
        const cleanedSentence = transcript.trim();
        if (cleanedSentence && cleanedSentence !== lastProcessed) {
          sendToBackend(cleanedSentence);
          setLastProcessed(cleanedSentence);
          resetTranscript();
        }
      }, 1200); // 1.2 seconds of silence means sentence done
    }
  }, [transcript, activated, lastProcessed, resetTranscript]);

  const sendToBackend = async (sentence) => {
    try {
      console.log("Sending:", sentence);
     const data = await fetch(`${process.env.REACT_APP_BACKEND}/audio-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: sentence })
      });

      console.log(data);
      
    } catch (error) {
      console.error("Failed to send:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>{activated ? "Listening for sentences..." : "Say 'good morning sir' or 'yes sir' to activate"}</p>
      <p>Current sentence: {transcript}</p>
    </div>
  );
};

export default VoiceAssistant;



