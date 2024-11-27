import express from "express";
import { search, home } from "../controllers/videoController";
import { getJoin, postJoin, login } from "../controllers/userController";

//Global Router
export const rootRouter = express.Router();
rootRouter.get("", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);
