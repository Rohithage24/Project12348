import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  emoji: { type: String },
  Headline: { type: String, required: true },
  descriptionlong : { type: String, required: true }

}, { timestamps: true });

const TopicModel  = mongoose.model('Topic', topicSchema);
export default TopicModel ;
