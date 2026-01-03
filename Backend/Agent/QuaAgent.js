import mongoose from "mongoose";

// Schema for all topics
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  correctAnswer: { type: String },
});

// Models for each topic
const QuestionReact = mongoose.model("QuestionReact", questionSchema);
const QuestionJava = mongoose.model("QuestionJava", questionSchema);
const QuestionHTML = mongoose.model("QuestionHTML", questionSchema);
const QuestionNodejs = mongoose.model("QuestionNodejs", questionSchema);
const QuestionJavascript = mongoose.model("QuestionJavascript", questionSchema);

// Map topic name to model
const topics = {
  React: QuestionReact,
  JavaScript: QuestionJavascript,
  "HTML/CSS": QuestionHTML,
  "Node.js": QuestionNodejs,
  Java: QuestionJava,
};

// ✅ Get 5–8 random questions by topic
const getRandomQuestions = async (req, res) => {
  const topic = req.params.topic;
  console.log("Requested topic:", topic);

  try {
    const Model = topics[topic]; // pick correct model
    if (!Model) {
      return res.status(400).json({ message: "Invalid topic selected" });
    }

    const randomCount = Math.floor(Math.random() * (8 - 5 + 1)) + 5;

    const questions = await Model.aggregate([
      { $sample: { size: randomCount } }
    ]);

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found in database" });
    }

    return res.status(200).json(questions);
  } catch (err) {
    console.error("Get Random Questions Error:", err);
    return res.status(500).json({ message: "Failed to fetch random questions" });
  }
};

// // ✅ Insert questions into a specific topic
// exports.insertQuestions = async (req, res) => {
//   try {
//     const { topic, data } = req.body; // expects { topic: "React", data: [...] }

//     const Model = topics[topic];
//     if (!Model) {
//       return res.status(400).json({ message: "Invalid topic selected" });
//     }

//     const inserted = await Model.insertMany(data);

//     res.status(201).json({
//       message: "Questions inserted successfully",
//       count: inserted.length,
//     });
//   } catch (err) {
//     console.error("Insert Questions Error:", err);
//     res.status(500).json({ message: "Failed to insert questions" });
//   }
// };


// In ReactAgent.js or routes file
const insertQuestions = async (req, res) => {
  try {
    const data = req.body; // expects array of questions

    const inserted = await QuestionJavascript.insertMany(data);
    res.status(201).json({
      message: "Questions inserted successfully",
      count: inserted.length,
    });
  } catch (err) {
    console.error("Insert Questions Error:", err);
    res.status(500).json({ message: "Failed to insert questions" });
  }
};


export default {getRandomQuestions , insertQuestions}