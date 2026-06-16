import {serviceGetVehicles,serviceCreateVehicle, serviceGetVehicleSummary} from "./vehicleService.js"
import type {Request, Response} from "express"

export async function getVehicles(req:Request, res: Response) {
  const vehicles = await serviceGetVehicles();

  return res.json(vehicles);
}

type CreateVehicleRequest = { //specifying a request for creating a vehicle 
  name: string;
  type: string;
};

export async function createVehicle(req:Request<{}, {}, CreateVehicleRequest>, res: Response) {

  if ( !req.body.name || !req.body.type) {
    return res.status(400).json({
        error: "name and type are required",
    });
  }
  const name = req.body.name;
  const type = req.body.type;

  console.log("name: "+name+"type: "+type)

  const vehicle = await serviceCreateVehicle(name,type);

  return res.status(201).json(vehicle);
}

export async function getVehicleSummary(
  req: Request<{ vehicleId: string }>,
  res: Response
) {
  try {
    const { vehicleId } = req.params;

    const summary =
      await serviceGetVehicleSummary(vehicleId);

    if (!summary) {
      return res.status(404).json({
        error: "Vehicle not found",
      });
    }

    return res.status(200).json(summary);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to retrieve vehicle summary",
    });
  }
}