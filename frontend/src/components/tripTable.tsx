import { useEffect, useState } from "react";

import { getTrips, getVehicles } from "../api/api";

export function TripsTable() {

    const [vehicles, setVehicles] = useState<any[]>([]); //for load vehicles
    const [vehicleId, setVehicleId] = useState(""); //for load trips
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [trips, setTrips] = useState<any[]>([]);

    const [loading, setLoading] =
    useState(false);

    const [error, setError] =
    useState("");

    useEffect(() => {
    loadTrips();
    loadVehicles();
    }, []);

    async function loadVehicles() {
        try {
            const vehicles =
            await getVehicles();

            setVehicles(vehicles);
        } catch (error) {
            console.error(error);
        }
    }
    async function loadTrips() {

        try {
            setLoading(true);

            const result = await getTrips(
            vehicleId || undefined,
            from || undefined,
            to || undefined,
            page,
            pageSize
        );

            setTrips(result.items);
        } catch (err) {
            setError(
            "Failed to load trips"
            );
        } finally {
            setLoading(false);
        }
        }

        if (loading) {
        return <p>Loading trips...</p>;
        }

        if (error) {
        return <p>{error}</p>;
        }

        return (
        <>
            <h2>Trips</h2>

            <div className="form-row">
        <label>Vehicle Id</label>

        <select
        value={vehicleId}
        onChange={(e) =>
        setVehicleId(e.target.value)
    }
    >
    <option value="">
        All Vehicles
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
  <label>From</label>

  <input
    type="date"
    value={from}
    onChange={(e) =>
      setFrom(e.target.value)
    }
  />
</div>

<div className="form-row">
  <label>To</label>

  <input
    type="date"
    value={to}
    onChange={(e) =>
      setTo(e.target.value)
    }
  />
</div>

<button className="form-row" onClick={loadTrips}>
  Filter
</button>

 {trips.length === 0 ? (
      <p>No trips found.</p>
    ) : (
      <table className="trip-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Start</th>
            <th>End</th>
            <th>Distance</th>
            <th>Energy</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.vehicleId}</td>

              <td>
                {new Date(trip.startTime).toLocaleString()}
              </td>

              <td>
                {new Date(trip.endTime).toLocaleString()}
              </td>

              <td>
                {trip.distance}
              </td>

              <td>
                {trip.energyUsed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </>
  );
}