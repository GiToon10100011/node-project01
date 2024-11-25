import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/nodeproject01db");

const db = mongoose.connection;

const handleInit = () => console.log("✅ DB connected");

//db이벤트 핸들러 (에러가 발생하면 실행)
db.on("error", () => console.log("❌ DB error"));

//최초 접속 이벤트
db.once("open", handleInit);

