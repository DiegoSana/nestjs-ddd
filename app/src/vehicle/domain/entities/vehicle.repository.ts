import { Vehicle } from './vehicle';

export interface VehicleRepository {
  getById: (id: number) => Promise<Vehicle | null>;
  createVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
  updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>;
  deleteVehicle: (id: number) => Promise<boolean>;
}
