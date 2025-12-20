import express from "express";
import userAuth from "../middlewares/userAuth.js";

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    validateEditProfileData(req);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
profileRouter.patch("/password", (req, res) => {});

export default profileRouter;
