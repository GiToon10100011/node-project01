import express from "express";
import {
  edit,
  check,
  logout,
  remove,
  triggerGithubLogin,
  callbackGithub,
} from "../controllers/userController";

//User Router
export const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/:id", check);
userRouter.get("/github/start", triggerGithubLogin);
userRouter.get("/github/callback", callbackGithub);
