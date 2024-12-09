import express from "express";
import {
  check,
  logout,
  triggerGithubLogin,
  callbackGithub,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectedRoutingMiddleware,
  publicOnlyMiddleware,
  uploadAvatars,
} from "../middlewares";

//User Router
export const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectedRoutingMiddleware)
  .get(getEdit)
  .post(uploadAvatars.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectedRoutingMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/logout", protectedRoutingMiddleware, logout);
userRouter.get("/:id", protectedRoutingMiddleware, check);
userRouter.get("/github/start", publicOnlyMiddleware, triggerGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithub);
