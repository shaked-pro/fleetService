import express from "express";
import { vehicleRouter } from "./src/vehicle/vehicleRouter.js";
import { tripRouter } from "./src/trip/tripRouter.js";


const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/vehicles", vehicleRouter);
app.use("/trips", tripRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});