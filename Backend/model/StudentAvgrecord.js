import mongoose from "mongoose";

const StudentAvgrecordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    accuracy: { type: Number, required: true, default: 0 },
    emotion :{type : Number , required :true},
    VoiceConfindance :{type : Number , required :true},
},{timestamps:true}
)

const AvgrecordModel = mongoose.model("StudentAvgrecord" , StudentAvgrecordSchema)

export default AvgrecordModel;