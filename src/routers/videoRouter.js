import express from "express";
import {
  deleteVideo,
  edit,
  upload,
  watch,
} from "../controllers/videoController";

export const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", watch);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);
