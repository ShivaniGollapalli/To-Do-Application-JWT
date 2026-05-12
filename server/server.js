import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/mongo.js";
import authRouter from "./routes/authRouters.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://to-do-application-jwt.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on ${port}`);
});