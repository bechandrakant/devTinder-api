import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 3, maxLength: 50 },
    about: { type: String, default: "This is default about" },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      lowercase: true,
      trim: true,
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

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const isValidPassword = await bcrypt.compare(inputPassword, this.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

export default User;
