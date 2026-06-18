import { useEffect, useState } from "react";
import type {Vehicle,VehicleSummaryFields} from "../types/types"

import {
  getVehicles,
  getVehicleSummary,
} from "../api/api";

export function VehicleSummary() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [vehicleId, setVehicleId] =
    useState("");

  const [summary, setSummary] =
    useState<VehicleSummaryFields | null>(null);
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      const vehicles =
        await getVehicles();

      setVehicles(vehicles);
    } catch (error) {
      console.error(error);
      setError(
        "Failed to load vehicles"
      );
    }
  }

  async function loadSummary() {
    if (!vehicleId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result =
        await getVehicleSummary(
          vehicleId
        );

      setSummary(result);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load summary"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Vehicle Summary</h2>

      <div className="form-row">
        <label>Vehicle</label>

        <select
          value={vehicleId}
          onChange={(e) =>
            setVehicleId(
              e.target.value
            )
          }
        >
          <option value="">
            Select Vehicle
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

      <button
        className="form-button"
        onClick={loadSummary}
      >
        Show Summary
      </button>

      {loading && (
        <p>Loading summary...</p>
      )}

      {error && <p>{error}</p>}

      {summary && (
        <div>
          <p>
            <strong>
              Trip Count:
            </strong>{" "}
            {summary.tripCount}
          </p>

          <p>
            <strong>
              Total Distance:
            </strong>{" "}
            {summary.totalDistance}
          </p>

          <p>
            <strong>
              Average Duration:
            </strong>{" "}
            {
              summary.averageTripDurationMinutes
            }{" "}
            minutes
          </p>
        </div>
      )}
    </>
  );
}