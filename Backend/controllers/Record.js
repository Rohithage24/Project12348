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
  const testId = req.params.id;
console.log(testId);

  try {
    const test = await TestRecord.findById(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    
    return res.status(200).json(test);
  } catch (err) {
    console.error("Get Test Error:", err);
    return res.status(500).json({ message: "Failed to fetch test" });
  }
};

export default {
  QueAns,
  record,
  getUserTest,
  getTest
};




// import TestRecord from '../model/TestQuestion.js';

// let testSessions = {};

// const QueAns = async (req, res) => {
//   const { userId, question, answer ,correctAnswer ,confidenceScore ,allConfindance } = req.body;
//   console.log(req.body);
  
//   try {
//     const response = await fetch(
//       'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmNXLI2rRoYliD0gNsodU_LeBH7mIMhCI',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: 'user',
//               parts: [
//                 {
//                   text: `Give me Score and accuracy of this Question and Answer in percentage for an interview.
// Question: ${question} 
// Answer: ${answer} 
// Respond ONLY in raw JSON with keys: correctAnswer, score, accuracy`
//                 }
//               ]
//             }
//           ]
//         })
//       }
//     );

//     const data = await response.json();
//     let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
//     reply = reply.replace(/```json|```/g, '').trim();

//     let parsedReply;
//     try {
//       parsedReply = JSON.parse(reply);
//     } catch {
//       parsedReply = { correctAnswer: correctAnswer, score: 0, accuracy: 0 };
//     }

//     if (!testSessions[userId]) {
//       testSessions[userId] = [];
//     }

//     testSessions[userId].push({
//       questionText: question,
//       correctAnswer: correctAnswer || "Not provided",
//       userAnswer: answer,
//       QuesScore: parsedReply.score || 0,
//       accuracy: parsedReply.accuracy || 0,
//       ConfidenceScore:confidenceScore,
//       AllConfindacce:allConfindance,
//     });

//     res.json({ reply: parsedReply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error calling Gemini API');
//   }
// };

// const record = async (req, res) => {
//   try {
//     const { userId, headline } = req.body;
//     const sessionQuestions = testSessions[userId] || [];

//     if (!sessionQuestions.length) {
//       return res.status(400).json({ message: "No questions found for this user" });
//     }

//     let score = 0;
//     sessionQuestions.forEach(q => score += q.QuesScore || 0);

//     const testRec = await TestRecord.create({
//       userId,
//       headline,
//       questions: sessionQuestions,
//       score,
//       date: new Date()
//     });

//     delete testSessions[userId];
//     console.log(testRec);
    
//     return res.status(201).json({
//       message: "Test Complete successfully",
//       test: testRec
//     });
//   } catch (err) {
//     console.error("Add text Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// const getUserTest = async (req, res) => {
//    const _id = req.params.id;
//   try {
//     const TestRecords = await TestRecord.find({userId : _id});
//     return res.status(200).json(TestRecords);
//   } catch (err) {
//     console.error("Get Topics Error:", err);
//     return res.status(500).json({ message: "Failed to fetch topics" });
//   }
// };


// const getTest = async (req, res) => {
//    const _id = req.params.id;
//   //  console.log(_id);
   
//   try {
//     const TestRecords = await TestRecord.find({_id : _id});
//     return res.status(200).json(TestRecords);
//   } catch (err) {
//     console.error("Get Topics Error:", err);
//     return res.status(500).json({ message: "Failed to fetch topics" });
//   }
// };

// export default {  QueAns, record ,getUserTest ,getTest}
