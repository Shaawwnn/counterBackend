import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGO_STRING);

const Count = mongoose.model("count", new mongoose.Schema({ count: Number }));

//getting the current count
app.get("/api/count", async (req, res) => {
  const count = await Count.findById("6419d630f296e6e8a35601a9");
  res.status(200).json(count);
});

//increment by 1
app.put("/api/add", async (req, res) => {
  await Count.updateOne(
    { _id: "6419d630f296e6e8a35601a9" },
    { $inc: { count: 1 } }
  );
  res.send("added 1");
});

//decrement by 1
app.put("/api/minus", async (req, res) => {
  await Count.updateOne(
    { _id: "6419d630f296e6e8a35601a9" },
    { $inc: { count: -1 } }
  );
  res.send("subtracted 1");
});

//reset to 0
app.put("/api/reset", async (req, res) => {
  await Count.updateOne(
    { _id: "6419d630f296e6e8a35601a9" },
    { $set: { count: 0 } }
  );
  res.send("reset");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running");
});
