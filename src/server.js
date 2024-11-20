import express from "express";
import morgan from "morgan";
const PORT = 4000;
const app = express();
const morganMiddleware = morgan("combined");

const handleHome = (req, res) => {
  return res.send("Home");
};

const handleUser = (req, res) => {
  return res.send("Edit User");
};

const handleVideo = (req, res) => {
  return res.send("Watch Video");
};

//Global Router
const globalRouter = express.Router();
globalRouter.get("", handleHome);
const userRouter = express.Router();
userRouter.get("/edit", handleUser);
const videoRouter = express.Router();
videoRouter.get("/watch", handleVideo);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

app.use(morganMiddleware);

const handleListening = () => {
  console.log(`Listening on ${PORT}`);
};
app.listen(4000, handleListening);
