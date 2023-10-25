import express from "express";
// const dotenv = require("dotenv").config();
import mongoose from "mongoose";
import router from "./routes/user-routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", router);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

// Sp5GxJzigkO0cI9B
