import express from "express";
import morgan from "morgan";
import { rootRouter } from "./routers/rootRouter";
import { userRouter } from "./routers/userRouter";
import { videoRouter } from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
const app = express();
const log = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    //특정 시간이 지나면 세션데이터를 업데이트 시킴.
    //유저가 오지않아도 계속 데이터가 업데이트 되므로 조금 비효율적일 수 있음.
    resave: true,
    //실행(init)이 되기 전까지도 세션데이터를 저장시킴, 초기화되지 않은 세션이더라도 데이터들을 저장시킴
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

// app.get("/add-one", (req, res) => {
//   //   //의도적으로 클라이언트를 여러명있다고 알리기 위해, 실상은 1명
//   //   //근데 얘가 있다고 왜 재시작하면 세션 아이디가 달라지는거지? 그리고 왜 갑자기 또 아이디가 안바뀌는거지
//   // if (req.session.specialUser === undefined || isNaN(req.session.specialUser)) {
//   //   req.session.specialUser = 0;
//   // }
//   req.session.specialUser += 1;
//   return res.send(`${req.session.id}`);
// });

app.use(localsMiddleware);
//글로벌라우터는 항상 밑에 둬야해
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);
app.use("/uploads", express.static("uploads"));

export default app;
