import TestRecord from "../model/TestQuestion.js";

const testSessions = {};

/**
 * Handle Question & Answer
 */
const QueAns = async (req, res) => {
  const {
    userId,
    question,
    answer,
    correctAnswer,
    confidenceScore,
    allConfindance
  } = req.body;

  if (!userId || !question || !answer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Give me Score and accuracy of this Question and Answer in percentage for an interview.
Question: ${question}
Answer: ${answer}
Respond ONLY in raw JSON with keys: correctAnswer, score, accuracy`
                }
              ]
            }
          ]
        })
      }
    );

    const geminiData = await response.json();
    let reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // remove ```json wrappers
    reply = reply.replace(/```json|```/g, "").trim();

    let parsedReply = {
      correctAnswer: correctAnswer || "Not provided",
      score: 0,
      accuracy: 0
    };

    // try {
    //   parsedReply = JSON.parse(reply);
    // } catch (err) {
    //   console.error("Gemini JSON parse failed:", reply);
    // }

    if (!testSessions[userId]) {
      testSessions[userId] = [];
    }

    testSessions[userId].push({
      questionText: question,
      correctAnswer: parsedReply.correctAnswer || correctAnswer || "Not provided",
      userAnswer: answer,
      QuesScore: Number(parsedReply.score) || 0,
      accuracy: Number(parsedReply.accuracy) || 0,
      ConfidenceScore: Number(confidenceScore) || 0,
      AllConfindacce: allConfindance || {}
    });

    return res.status(200).json({
      reply: parsedReply,
      currentQuestionCount: testSessions[userId].length
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ message: "Error calling Gemini API" });
  }
};

/**
 * Save Test Record
 */
const record = async (req, res) => {
  const { userId, headline } = req.body;

  if (!userId || !headline) {
    return res.status(400).json({ message: "Missing userId or headline" });
  }

  try {
    const sessionQuestions = testSessions[userId];

    if (!sessionQuestions || sessionQuestions.length === 0) {
      return res.status(400).json({ message: "No questions found for this user" });
    }

    const totalScore = sessionQuestions.reduce(
      (sum, q) => sum + (q.QuesScore || 0),
      0
    );

    const testRec = await TestRecord.create({
      userId,
      headline,
      questions: sessionQuestions,
      score: totalScore,
      date: new Date()
    });

    // console.log(testRec);
    

    delete testSessions[userId]; // clear memory

    return res.status(201).json({
      message: "Test completed successfully",
      test: testRec
    });

  } catch (err) {
    console.error("Record Save Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get all tests for a user
 */
const getUserTest = async (req, res) => {
  const userId = req.params.id;

  try {
    const tests = await TestRecord.find({ userId }).sort({ date: -1 });
    return res.status(200).json(tests);
  } catch (err) {
    console.error("Get User Tests Error:", err);
    return res.status(500).json({ message: "Failed to fetch tests" });
  }
};

/**
 * Get single test by testId
 */
const getTest = async (req, res) => {
   const _id = req.params.id;
  //  console.log(_id);
   
  try {
    const TestRecords = await TestRecord.find({_id : _id});
    // console.log(TestRecords);
    
    return res.status(200).json(TestRecords);
  } catch (err) {
    console.error("Get Topics Error:", err);
    return res.status(500).json({ message: "Failed to fetch topics" });
  }
};

export default {
  QueAns,
  record,
  getUserTest,
  getTest
};


