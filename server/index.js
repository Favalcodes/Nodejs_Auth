import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
//import db
import "./config/mongo.js"


// port
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  console.log("Hello");
});
import userRouter from "./api/routes/user.js";
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}/`);
});