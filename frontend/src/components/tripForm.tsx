import { useEffect, useState } from "react";

import { getVehicles, createTrip } from "../api/api.js";
import type { Vehicle } from "../types/types.js";

export function TripForm() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [vehicleId, setVehicleId] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [distance, setDistance] = useState("");
  const [energyUsed, setEnergyUsed] = useState("");

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createTrip({
        vehicleId,
        startTime,
        endTime,
        distance: Number(distance),
        energyUsed: Number(energyUsed),
      });

      setVehicleId("");
      setStartTime("");
      setEndTime("");
      setDistance("");
      setEnergyUsed("");

      alert("Trip created");
    } catch (error) {
      console.error(error);
      alert("Failed to create trip");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Trip</h2>

      <div className="form-row">
        <label>Vehicle</label>

        <select
          value={vehicleId}
          onChange={(e) =>
            setVehicleId(e.target.value)
          }
        >
          <option value="">
            Select vehicle
          </option>

          {vehicles.map((vehicle) => (
            <option
              key={vehicle.id}
              value={vehicle.id}
            >
              {vehicle.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Start Time</label>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) =>
            setStartTime(e.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label>End Time</label>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) =>
            setEndTime(e.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label>Distance</label>

        <input
          type="number"
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label>Energy Used</label>

        <input
          type="number"
          value={energyUsed}
          onChange={(e) =>
            setEnergyUsed(e.target.value)
          }
        />
      </div>

      <button className="form-row" type="submit">
        Create Trip
      </button>
    </form>
  );
}