import express from "express";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.get("/feed", userAuth, (req, res) => {});
userRouter.get("/requests", userAuth, (req, res) => {});
userRouter.get("/connections", userAuth, (req, res) => {});

export default userRouter;
