import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

// Routers
import userRouter from "./router/UserContral.js";
import TopicControl from "./router/TopicControl.js";
import chatRouter from "./router/chatRouter.js";
import RecordRouter from "./router/RecordRouter.js";
import QuestionRou from "./router/QuestionsRouter.js";
import { getImage , calEmo} from "./controllers/Emotion.js";


// Middleware
import authMiddleware from "./middlewares/authMiddleware.js";

// Controllers
import { logout } from "./controllers/logout.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

/*  PUBLIC ROUTES (NO TOKEN REQUIRED) */
app.use("/api/user", userRouter);

/*  PROTECTED ROUTES (TOKEN REQUIRED) */
app.use("/api/topic", TopicControl);
app.use("/api/agentChat", authMiddleware, chatRouter);
app.use("/api/record", authMiddleware, RecordRouter);
app.use("/api/question", authMiddleware, QuestionRou);

/* LOGOUT */
app.get("/api/logout", authMiddleware, logout);

app.post("/api/emonation" ,getImage )
app.get("/api/calEmo", calEmo);

export default server;





// import Express from 'express'
// import dotenv from 'dotenv'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// import http from 'http'

// import mongoose from 'mongoose'
// // import { mongodb } from "./config/mongodb.js";

// // Controllers
// import userRouter from './router/UserContral.js';
// import TopicControl from './router/TopicControl.js';
// import chatRouter from './router/chatRouter.js'
// import RecordReuter from './router/RecordRouter.js'
// import QuestionRou from "./router/QuestionsRouter.js"
// import {authourization , logout} from "./controllers/authControll.js"
// // import { addTopic, getTopics } from "./controllers/TopicCon.js";



// dotenv.config()

// const app = Express()

// const sever = http.createServer(app)

// app.use(cors())
// app.use(cookieParser())
// app.use(Express.json())
// app.use(bodyParser.json())

// // usercontral
// app.use('/api/user', userRouter)
// app.use('/api/topic', TopicControl)

// app.use("/api/agenChat", chatRouter)


// app.use("/api/recordRouter" , RecordReuter)

// app.use("api/queRou" , QuestionRou)

// app.get("/api", authourization);


// app.post("/logout", logout);



// export default sever
