import express from "express";
import morgan from "morgan";
import { globalRouter } from "./routers/globalRouter";
import { userRouter } from "./routers/userRouter";
import { videoRouter } from "./routers/videoRouter";
const PORT = 4000;
const app = express();
const log = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

const handleListening = () => {
  console.log(`Listening on ${PORT}`);
};
app.listen(4000, handleListening);
