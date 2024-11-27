import "./db";
import "./models/video";
import "./models/user";

import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on ${PORT}`);
};

app.listen(4000, handleListening);
