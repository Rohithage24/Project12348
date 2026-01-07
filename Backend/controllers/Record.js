import TestRecord from '../model/TestQuestion.js';

let testSessions = {};

const QueAns = async (req, res) => {
  const { userId, question, answer ,correctAnswer } = req.body;
  console.log(req.body);
  
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmNXLI2rRoYliD0gNsodU_LeBH7mIMhCI',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
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

    const data = await response.json();
    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    reply = reply.replace(/```json|```/g, '').trim();

    let parsedReply;
    try {
      parsedReply = JSON.parse(reply);
    } catch {
      parsedReply = { correctAnswer: correctAnswer, score: 0, accuracy: 0 };
    }

    if (!testSessions[userId]) {
      testSessions[userId] = [];
    }

    testSessions[userId].push({
      questionText: question,
      correctAnswer: correctAnswer || "Not provided",
      userAnswer: answer,
      QuesScore: parsedReply.score || 0,
      accuracy: parsedReply.accuracy || 0
    });

    res.json({ reply: parsedReply });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling Gemini API');
  }
};

const record = async (req, res) => {
  try {
    const { userId, headline } = req.body;
    const sessionQuestions = testSessions[userId] || [];

    if (!sessionQuestions.length) {
      return res.status(400).json({ message: "No questions found for this user" });
    }

    let score = 0;
    sessionQuestions.forEach(q => score += q.QuesScore || 0);

    const testRec = await TestRecord.create({
      userId,
      headline,
      questions: sessionQuestions,
      score,
      date: new Date()
    });

    delete testSessions[userId];

    return res.status(201).json({
      message: "Test Complete successfully",
      test: testRec
    });
  } catch (err) {
    console.error("Add text Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getUserTest = async (req, res) => {
   const _id = req.params.id;
  //  console.log(_id);
   
  try {
    const TestRecords = await TestRecord.find({userId : _id});
    return res.status(200).json(TestRecords);
  } catch (err) {
    console.error("Get Topics Error:", err);
    return res.status(500).json({ message: "Failed to fetch topics" });
  }
};


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

export default {  QueAns, record ,getUserTest ,getTest}
// const TestRecord = require('../model/TestQuestion')

// // let testSessions = {}; 

// // exports.QueAns = async (req, res) => {
// //   const { userId, question, answer } = req.body
// //   console.log(req.body);
  
// //   try {
// //     const response = await fetch(
// //       'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmNXLI2rRoYliD0gNsodU_LeBH7mIMhCI',
// //       {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           contents: [
// //             {
// //               role: 'user',
// //               parts: [
// //                 {
// //                   text: `Give me Score and accuracy of this Question and Answer in percentage for an interview. 
// // Question: ${question} 
// // Answer: ${answer} 
// // Respond in JSON format with keys: correctAnswer, score, accuracy`
// //                 }
// //               ]
// //             }
// //           ]
// //         })
// //       }
// //     );

// //     const data = await response.json();
// //     const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
// //     console.log("Gemini Reply:", reply);

// //     let parsedReply;
// //     try {
// //       parsedReply = JSON.parse(reply); // convert string JSON → object
// //     } catch (err) {
// //       parsedReply = {};
// //       console.error("Failed to parse Gemini reply:", err);
// //     }

// //     if (!testSessions[userId]) {
// //       testSessions[userId] = [];
// //     }

// //     testSessions[userId].push({
// //       questionText: question,
// //       correctAnswer: parsedReply.correctAnswer || "Not provided",
// //       userAnswer: answer,
// //       QuesScore: parsedReply.score || 0,
// //       accuracy: parsedReply.accuracy || 0
// //     });

// //     console.log("Current Session:", testSessions[userId]);

// //     res.json({ reply: parsedReply })
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send('Error calling Gemini API');
// //   }
// // };

// let testSessions = {};

// exports.QueAns = async (req, res) => {
//   const { userId, question, answer } = req.body;
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
//     console.log("Gemini Reply:", reply);

//     // 🛠 Remove ```json ``` wrappers if present
//     reply = reply.replace(/```json|```/g, '').trim();

//     let parsedReply;
//     try {
//       parsedReply = JSON.parse(reply);
//     } catch (err) {
//       console.error("Failed to parse Gemini reply:", err);
//       parsedReply = { correctAnswer: "Not provided", score: 0, accuracy: 0 };
//     }

//     if (!testSessions[userId]) {
//       testSessions[userId] = [];
//     }

//     testSessions[userId].push({
//       questionText: question,
//       correctAnswer: parsedReply.correctAnswer || "Not provided",
//       userAnswer: answer,
//       QuesScore: parsedReply.score || 0,
//       accuracy: parsedReply.accuracy || 0
//     });

//     console.log("Current Session:", testSessions[userId]);

//     res.json({ reply: parsedReply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error calling Gemini API');
//   }
// };

// exports.record = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { userId, headline } = req.body;

//     // get the session for this user
//     const sessionQuestions = testSessions[userId] || [];

//     // calculate score
//     let score = 0;
//     sessionQuestions.forEach(q => {
//       score += q.QuesScore || 0;
//     });

//     // save record
//     const testRec = await TestRecord.create({
//       userId,
//       headline,
//       questions: sessionQuestions,  // ✅ array of Q/A
//       score,
//       date: new Date()
//     });

//     // clear memory
//     delete testSessions[userId];

//     return res.status(201).json({
//       message: "Test Complete successfully",
//       test: testRec
//     });

//   } catch (err) {
//     console.error("Add text Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// // exports.record = async (req, res) => {
// //   console.log(req.body);
// //   try {
// //     const { userId, headline } = req.body;

// //     const testRec = await TestRecord.create({
// //       userId,
// //       headline,
// //       questions: testSessions[userId] || [],
// //       score,
// //       date,
// //       // timeTaken
// //     });

// //     delete testSessions[userId]; // clear memory after save

// //     return res.status(201).json({
// //       message: "Test Complete successfully",
// //       test: testRec
// //     });

// //   } catch (err) {
// //     console.error("Add text Error:", err);
// //     return res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };
