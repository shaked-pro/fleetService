// rout :trips
import { Router } from "express";
import{createTrip, getTrips} from "./tripController.js"

export const tripRouter = Router();

tripRouter.post("/", createTrip);

tripRouter.get("/", getTrips);