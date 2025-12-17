import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const user = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      gender: "Male",
      age: 25,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
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
