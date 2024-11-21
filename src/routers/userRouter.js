import express from "express";
import { edit, check, logout, remove } from "../controllers/userController";

//User Router
export const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id", check);
