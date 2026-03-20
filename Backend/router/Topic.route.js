import express from "express";
import TopicCon from "../controllers/Topic.controller.js";

const router = express.Router();

router.post("/topicAdd" , TopicCon.addTopic);
router.get("/topicget" , TopicCon.getTopics);
router.get("/topicone/:id" , TopicCon.getOneTopics);

export default router;
