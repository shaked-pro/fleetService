import { useState } from "react";

type VehicleFormProps = {
  onVehicleCreated: () => void;
};

export function VehicleForm({
  onVehicleCreated,
}: VehicleFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/vehicles",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create vehicle"
        );
      }

      setName("");
      setType("");

      onVehicleCreated();
    } catch (error) {
      console.error(error);
      alert("Failed to create vehicle");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Vehicle</h2>

      <div className="form-row">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label>Type</label>
        <input
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        />
      </div>

      <button className="form-row" type="submit">
        Create Vehicle
      </button>
    </form>
  );
}