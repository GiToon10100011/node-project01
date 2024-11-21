import express from "express";
import { search, trending } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

//Global Router
export const globalRouter = express.Router();
globalRouter.get("", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);
