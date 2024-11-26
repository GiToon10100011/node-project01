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
//16진수의 24자리만 받을 수 있게하는 정규표현식을 사용
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
