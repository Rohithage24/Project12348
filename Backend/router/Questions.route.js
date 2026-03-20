import express from "express";
import Questions from '../Agent/QuaAgent.js'
const router = express.Router();

router.get('/questiona/:topic', Questions.getRandomQuestions)
router.post('/postQuestion', Questions.insertQuestions)

export default router;