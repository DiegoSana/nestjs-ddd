import { IVehicle, Vehicle, VehicleProperties } from "./vehicle";

export abstract class VehicleFactory {
    public static create(properties: VehicleProperties): Vehicle {
        return new Vehicle({
            id: properties.id,
            vehicle_id: properties.vehicle_id,
            alias: properties.alias,
            capacity: properties.capacity,
            created_at: properties.created_at,
            updated_at: properties.updated_at,
            deleted_at: properties.deleted_at,
          });
    }
}