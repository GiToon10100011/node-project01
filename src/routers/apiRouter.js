import express from "express";
import { registerVideo } from "../controllers/videoController";

export const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/watch", registerVideo);

