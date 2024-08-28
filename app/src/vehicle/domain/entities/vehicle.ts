export type VehicleEssentialProperties = Required<{
  vehicle_id: string;
  capacity: number;
}>;

export type VehicleOptionalProperties = Partial<{
  id: number;
  alias: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}>;

export type VehicleProperties = VehicleEssentialProperties &
  VehicleOptionalProperties;

export interface IVehicle {
  hold: () => void;
}

export class Vehicle implements IVehicle {
  readonly id: number;
  readonly vehicle_id: string;
  capacity: number;
  alias: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(properties: VehicleProperties) {
    this.id = properties.id;
    this.vehicle_id = properties.vehicle_id;
    this.capacity = properties.capacity;
    this.alias = properties.alias;
    this.created_at = properties.created_at;
    this.updated_at = properties.updated_at;
    this.deleted_at = properties.deleted_at;
  }

  hold(): void {}
}
