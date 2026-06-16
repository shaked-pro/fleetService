//rout /vehicles
import { Router } from "express";
import {getVehicles} from "./vehicleController.js"

export const vehicleRouter = Router();

vehicleRouter.get("/", getVehicles);

vehicleRouter.post("/", async (req, res) => {
  res.status(201).json({
    message: "Create vehicle",
    body: req.body,
  });
});