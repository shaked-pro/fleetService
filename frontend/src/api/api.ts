const BASE_URL = "http://localhost:3000";


//TripForm helpers: 
export async function getVehicles() {
  const response = await fetch(
    `${BASE_URL}/vehicles`
  );

  if (!response.ok) {
    throw new Error("Failed to load vehicles");
  }

  return response.json();
}

export async function createTrip(payload: {
  vehicleId: string;
  startTime: string;
  endTime: string;
  distance: number;
  energyUsed: number;
}) {
  const response = await fetch(
    `${BASE_URL}/trips`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create trip");
  }

  return response.json();
}

//TripTable helpers
export async function getTrips(
  vehicleId?: string,
  from?: string,
  to?: string,
  page: number = 1,
  pageSize: number = 10
) {
  const params = new URLSearchParams();

  if (vehicleId) {
    params.append("vehicleId", vehicleId);
  }

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  const response = await fetch(
    `http://localhost:3000/trips?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to load trips");
  }

  return response.json();
}

//vehicle summary helpers 

export async function getVehicleSummary(
  vehicleId: string
) {
  const response = await fetch(
    `http://localhost:3000/vehicles/${vehicleId}/summary`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load vehicle summary"
    );
  }

  return response.json();
}