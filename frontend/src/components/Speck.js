import React, { useEffect, useState } from "react";

export default function SpeakQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/chat`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message:
              "give only question react js interview Question now the number of question is 5 ,  Now the formate in json array fromate"
          })
        });
        const data = await response.json();

        // Extract JSON from reply string
        const cleanedJson = data.reply.replace(/```json|```/g, "").trim();
        const parsedQuestions = JSON.parse(cleanedJson);

        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Speak each question one by one
  useEffect(() => {
    if (questions.length === 0 || currentIndex >= questions.length) return;

    const question = questions[currentIndex].question;
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.rate = 1; // speaking speed
    utterance.pitch = 1; // pitch tone

    utterance.onend = () => {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1000); // delay before next question
    };

    window.speechSynthesis.speak(utterance);
  }, [currentIndex, questions]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interview Questions</h1>
      {questions.length > 0 ? (
        <p>
          Speaking question {currentIndex + 1} of {questions.length}:
          <br />
          <strong>{questions[currentIndex]?.question}</strong>
        </p>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
