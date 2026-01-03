import Express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'

import mongoose from 'mongoose'
// import { mongodb } from "./config/mongodb.js";

// Controllers
import userRouter from './Router/UserContral.js';
import TopicControl from './router/TopicControl.js';
import chatRouter from './router/chatRouter.js'
import RecordReuter from './router/RecordRouter.js'
import QuestionRou from "./router/QuestionsRouter.js"
// import { addTopic, getTopics } from "./controllers/TopicCon.js";



dotenv.config()

const app = Express()

const sever = http.createServer(app)

app.use(cors())
app.use(cookieParser())
app.use(Express.json())
app.use(bodyParser.json())

// usercontral
app.use('/api/user', userRouter)
app.use('/api/topic', TopicControl)

app.use("/api/agenChat", chatRouter)


app.use("/api/recordRouter" , RecordReuter)

app.use("api/queRou" , QuestionRou)




export default sever
