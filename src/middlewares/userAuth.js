import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!email) {
      throw new Error("Invalid cookie");
    }

    const user = await User.findOne({ email });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export default userAuth;
