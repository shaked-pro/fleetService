import express from "express";
import { vehicleRouter } from "./src/vehicle/vehicleRouter.js";
import { tripRouter } from "./src/trip/tripRouter.js";
import cors from "cors"


const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(cors());
app.use("/vehicles", vehicleRouter);
app.use("/trips", tripRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});