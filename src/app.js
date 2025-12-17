import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

const saltRounds = 10;

const validateUser = (user) => {
  const { name, email, password } = user;

  if (!name || !email || !password) {
    throw new Error("Insufficient data");
  }
};

app.post("/signup", async (req, res) => {
  try {
    validateUser(req.body);

    const { name, about, email, password, gender, age, photoUrl } = req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      about,
      email,
      password: hashPassword,
      gender,
      age,
      photoUrl,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    res.status(200).send("Login successful");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

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
