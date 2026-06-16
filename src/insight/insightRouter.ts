//route /insights
import { Router } from "express";

export const insightsRouter = Router();

insightsRouter.get("/:vehicleId", async (req, res) => {
  res.json({
    message: "Vehicle insights",
    vehicleId: req.params.vehicleId,
  });
});