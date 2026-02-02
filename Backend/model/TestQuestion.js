import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  userAnswer: { type: String, default: "" },
  QuesScore: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  ConfidenceScore: { type: Number, default: 0 },
  evaluation: { type: String, required: true },

  // Nested object for AI confidence analysis
 AllConfindance: {
    overall_score: { type: Number, default: 0 },
    pace_score: { type: Number, default: 0 },
    clarity_score: { type: Number, default: 0 },
    tone_score: { type: Number, default: 0 },
    pace_feedback: { type: String, default: "" },
    clarity_feedback: { type: String, default: "" },
    tone_feedback: { type: String, default: "" }
  }
});

const testRecordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    headline: { type: String, required: true },
    questions: [questionSchema],
    score: { type: Number, required: true, default: 0 },
    accuracy: { type: Number, required: true, default: 0 },
    emotion :{type : Number , required :true},
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const TestRecord = mongoose.model("TestRecord", testRecordSchema);

export default TestRecord;



// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   questionText: { type: String, required: true },
//   correctAnswer: { type: String, required: true },
//   userAnswer: { type: String },
//   QuesScore: { type: Number },
//   accuracy: { type: Number }   // ✅ add this
// });

// const testRecordSchema = new mongoose.Schema({
//   userId :{ type: String, required: true },
//   headline: { type: String, required: true },
//   questions: [questionSchema],
//   score: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
// }, { timestamps: true });

// const TestRecord = mongoose.model("TestRecord", testRecordSchema);

// export default TestRecord;



