import express from "express";
import morgan from "morgan";
import { userRouter } from "./router/userRouter";
import { templateRouter } from "./router/templateRouter";
import { editRouter } from "./router/editRouter";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 5000;
const DB = process.env.DB_URL.replace("<USER>", process.env.DB_USER).replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB Connection Success!");
  })
  .catch((err) => {
    console.log("Err in DB Connection : ", err);
  });

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://jplate.ga", "https://jplate.ga"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());

app.use("/users", userRouter);
app.use("/templates", templateRouter);
app.use("/edits", editRouter);

app.listen(PORT, () => {
  console.log(`Server Start! Listening on ${PORT}`);
});
