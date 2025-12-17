import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 3, maxLength: 50 },
    about: { type: String, default: "This is default about" },
    email: {
      type: String,
      required: true,
      unique: true,
      trim,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password");
        }
      },
    },
    gender: {
      type: String,
      lowercase,
      trim,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    age: { type: Number, min: 18 },
    photoUrl: { type: String, default: "https://picsum.photos/200/300" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
