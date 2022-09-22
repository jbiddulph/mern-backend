import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // localhost:5050/users/signup
app.use("/item", itemRouter);

const MONGODB_URL =
  "mongodb+srv://xxx:xxx@cluster0.huopdeu.mongodb.net/lookwif?retryWrites=true&w=majority";

const port = 5050;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
