import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { validateSignUpData } from "../utils/validations.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body);

    const { name, about, email, password, gender, age, photoUrl, skills } =
      req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      about,
      email,
      password: hashPassword,
      gender,
      age,
      photoUrl,
      skills,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.status(200).send("Login successful");
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("Logout successful");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default authRouter;
