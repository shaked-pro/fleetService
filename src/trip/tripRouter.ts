// rout /trips
import { Router } from "express";

export const tripRouter = Router();

tripRouter.post("/", async (req, res) => {
  res.status(201).json({
    message: "Create trip",
    body: req.body,
  });
});