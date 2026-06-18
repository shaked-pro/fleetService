import './App.css'
import { VehicleForm } from "./components/vehicleForm";
import { TripForm } from './components/tripForm';
import { TripsTable } from './components/tripTable';
import { VehicleSummary } from './components/vehicleSummaryForm';

function App() {
  const refreshVehicles = () => {
    console.log("Vehicle created");
  };

  return (
    <div>
      <h1>Fleet Management</h1>

      <VehicleForm
        onVehicleCreated={refreshVehicles}
      />
      <TripForm />
      <TripsTable/>
      <VehicleSummary/>
    </div>
  );
}

export default App;
