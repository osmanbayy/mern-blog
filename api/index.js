import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log("Server is running on 3000 port!");
});

app.use("/api/user", routes);
