import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/user", profileRouter);

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB");
      console.log(`Server listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect`);
  });
