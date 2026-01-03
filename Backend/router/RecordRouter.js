import express from "express";
import Record from '../controllers/Record.js'
const router = express.Router();

router.post('/audio-text', Record.QueAns)
router.post('/submitExam', Record.record)
router.get('/textRecords/:id', Record.getUserTest)
router.get('/gettext/:id', Record.getTest)

export default router;