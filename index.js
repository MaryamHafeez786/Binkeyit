import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const Port = 8080 || process.env.PORT;

app.get("/", (request, response) => {
  // server to cilent
  response.json({
    message: "Serevr is running " + Port,
  });
});

// Connect to MongoDB

connectDB().then(() => {
  app.listen(Port, () => {
    console.log("Server is running", Port);
  });
});