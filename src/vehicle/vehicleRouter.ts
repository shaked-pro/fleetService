//rout /vehicles
import { Router } from "express";
import {getVehicles , createVehicle, getVehicleSummary} from "./vehicleController.js"

export const vehicleRouter = Router();

vehicleRouter.post("/", createVehicle);
vehicleRouter.get("/", getVehicles);

vehicleRouter.get("/:vehicleId/summary", getVehicleSummary);