import express from "express";
import {getAllAvgRecords , getAllAvgRecordStudent , deleteBatch}  from "../controllers/StudAVGRecord.controller.js"


const router  = express.Router();

router.get("/getAvgRecord", getAllAvgRecords);
router.get("/getAvgRecord/24BT", getAllAvgRecordStudent);
router.get("/del",deleteBatch);


export default router;