import express from "express";
import {
  deleteVideo,
  getEdit,
  postEdit,
  getUpload,
  watch,
  postUpload,
} from "../controllers/videoController";

export const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id", watch);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id/delete", deleteVideo);
