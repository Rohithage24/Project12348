import TopicModel from "../model/Topic.js";
import dotenv from "dotenv";

dotenv.config();

// Add a new topic
const addTopic = async (req, res) => {
  try {
    const { title, description, emoji, Headline , descriptionlong} = req.body;
    // console.log(req.body);
    

    const existing = await TopicModel.findOne({ title });
    if (existing) {
      return res.status(400).json({ message: "Topic already exists" });
    }

    const newTopic = await TopicModel.create({ title, description, emoji, Headline , descriptionlong });

    return res.status(201).json({
      message: "Topic created successfully",
      topic: newTopic,
    });
  } catch (err) {
    console.error("Add Topic Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.addTopic = async (req, res) => {
//   try {
//     const { title, description, emoji } = req.body;
//     console.log(req.body);


//     const existing = await TopicModel.findOne({ title });
//     if (existing) {
//       return res.status(400).json({ message: "Topic already exists" });
//     }

//     const Headline = `${emoji} ${title} Interview Page`;
//     const descriptionlong =
//       "This mock interview environment helps you track your progress and build confidence step by step.\n\nClick the magic button below to begin your preparation journey!";

//     const newTopic = await TopicModel.create({
//       title,
//       description,
//       emoji,
//       Headline,
//       descriptionlong,
//     });

//     return res.status(201).json({
//       message: "Topic created successfully",
//       topic: newTopic,
//     });
//   } catch (err) {
//     console.error("Add Topic Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// Get all topics
const getTopics = async (req, res) => {
  try {
    const topics = await TopicModel.find();
    // console.log(topics);
    
    return res.status(200).json(topics);
  } catch (err) {
    console.error("Get Topics Error:", err);
    return res.status(500).json({ message: "Failed to fetch topics" });
  }
};

// get only one
const getOneTopics = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    
    const topics = await TopicModel.findOne({_id:_id});
    return res.status(200).json(topics);
  } catch (err) {
    console.error("Get Topics Error:", err);
    return res.status(500).json({ message: "Failed to fetch topics" });
  }
};

export default {addTopic, getTopics, getOneTopics} 