import { Vehicle } from '../domain/entities/vehicle';

export class FindVehicleByIdUseCaseRequestDto {
  readonly id: number;
}

export class FindVehicleByIdUseCaseResponseDto {
  readonly id: number;
  readonly vehicle_id: string;
  readonly alias: string;
  readonly capacity: number;
  readonly created_at: Date;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id;
    this.alias = vehicle.alias;
    this.capacity = vehicle.capacity;
    this.vehicle_id = vehicle.vehicle_id;
    this.created_at = vehicle.created_at;
  }
}