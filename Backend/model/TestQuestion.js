import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  userAnswer: { type: String },
  QuesScore: { type: Number },
  accuracy: { type: Number }   // ✅ add this
});

const testRecordSchema = new mongoose.Schema({
  userId :{ type: String, required: true },
  headline: { type: String, required: true },
  questions: [questionSchema],
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const TestRecord = mongoose.model("TestRecord", testRecordSchema);

export default TestRecord;




// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   questionText: { type: String, required: true },
//   correctAnswer: { type: String, required: true },
//   userAnswer: { type: String },
//   QuesScore: { type: Number }
// });

// const testRecordSchema = new mongoose.Schema({
//   userId :{type:String , require : true},
//   headline: { type: String, required: true },
//   questions: [questionSchema],
//   score: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
//   // timeTaken: { type: String, required: true }
// }, { timestamps: true });

// const TestRecord = mongoose.model("TestRecord", testRecordSchema);

// module.exports = TestRecord;
