import express from "express";
import {
  deleteVideo,
  getEdit,
  postEdit,
  getUpload,
  watch,
  postUpload,
} from "../controllers/videoController";
import { protectedRoutingMiddleware, uploadVideos } from "../middlewares";

export const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(protectedRoutingMiddleware)
  .get(getUpload)
  .post(uploadVideos.single("video"), postUpload);
//16진수의 24자리만 받을 수 있게하는 정규표현식을 사용
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectedRoutingMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.get(
  "/:id([0-9a-f]{24})/delete",
  protectedRoutingMiddleware,
  deleteVideo
);
