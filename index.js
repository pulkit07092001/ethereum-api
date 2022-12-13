import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js";

import fetchAndUpdatePrice from "./utils/fetchEthereum.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO, (err) => {
  if (err) console.error(`mongoDB connection failed...`);
  else console.log("mongoDB is connected...");
});

app.use(express.json());
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`server is running on PORT ${PORT}...`);
});

const updatePriceInterval = setInterval(async () => {
  try {
    await fetchAndUpdatePrice();
  } catch (err) {
    console.error(err);
    clearInterval(updatePriceInterval);
  }
}, 1000 * 60 * 10);
