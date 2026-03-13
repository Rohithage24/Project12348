import express from "express";
import {getAllAvgRecords , getAllAvgRecordStudent}  from "../controllers/StudAVGRecord.js"


const router  = express.Router();

router.get("/getAvgRecord", getAllAvgRecords);
router.get("/getAvgRecord/24BT", getAllAvgRecordStudent);


export default router;