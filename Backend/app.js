import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
// import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";


// Routers
import userRouter from "./router/User.route.js";
import TopicControl from "./router/Topic.route.js";
import chatRouter from "./router/chat.route.js";
import RecordRouter from "./router/Record.route.js";
import QuestionRou from "./router/Questions.route.js";
import  StudAvgRec from "./router/StudAvgRec.route.js"
import { getImage , calEmo} from "./controllers/Emotion.controller.js";


// Middleware
import authMiddleware from "./middlewares/authMiddleware.js";

// Controllers
import { logout } from "./controllers/logout.controller.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // limit each IP
}));
app.use(cookieParser());
app.use(express.json());
// app.use(morgan("combined"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/*  PUBLIC ROUTES (NO TOKEN REQUIRED) */
app.use("/api/user", userRouter);

/*  PROTECTED ROUTES (TOKEN REQUIRED) */
app.use("/api/topic", TopicControl);
app.use("/api/agentChat", authMiddleware, chatRouter);
app.use("/api/record", authMiddleware, RecordRouter);
app.use("/api/question", authMiddleware, QuestionRou);
app.use("/api/RecResult", StudAvgRec);


/* LOGOUT */
app.post("/api/logout", authMiddleware, logout);

app.post("/api/emonation" ,getImage )
app.get("/api/calEmo", calEmo);

export default server;



