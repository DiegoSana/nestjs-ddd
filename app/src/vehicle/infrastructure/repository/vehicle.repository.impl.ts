import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Vehicle } from 'src/vehicle/domain/entities/vehicle';
import { VehicleRepository } from 'src/vehicle/domain/entities/vehicle.repository';
import { VehicleEntity } from '../entities/vehicle.entity';
import { VehicleFactory } from 'src/vehicle/domain/entities/vehicle.factory';

@Injectable()
export class VehicleRepositoryImpl
  extends Repository<VehicleEntity>
  implements VehicleRepository
{
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {
    super(
      vehicleRepository.target,
      vehicleRepository.manager,
      vehicleRepository.queryRunner,
    );
  }

  async getById(id: number): Promise<Vehicle | null> {
    return this.vehicleRepository
      .findOne({ where: { id: id } })
      .then((vehicle: VehicleEntity | null) => {
        if (!vehicle) return null;
        return this.mapToDomain(vehicle);
      });
  }

  async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleRepository
      .save(this.mapToOrm(vehicle))
      .then((vehicleEntity: VehicleEntity) => {
        return this.mapToDomain(vehicleEntity);
      });
  }

  async updateVehicle(vehicle: Vehicle): Promise<Vehicle | null> {
    return this.vehicleRepository
      .update({ id: vehicle.id }, { ...vehicle })
      .then((result: UpdateResult) => {
        if (!result.affected) return null;
        return this.vehicleRepository.findOne({ where: { id: vehicle.id } });
      })
      .then((vehicleEntity: VehicleEntity) => {
        if (!vehicleEntity) return null;
        return this.mapToDomain(vehicleEntity);
      });
  }

  async deleteVehicle(id: number): Promise<boolean> {
    const result = await this.vehicleRepository.softDelete(id);
    return result.affected > 0;
  }

  mapToOrm(vehicle: Vehicle): VehicleEntity {
    const vehicleEntity: VehicleEntity = new VehicleEntity();
    vehicleEntity.id = vehicle.id;
    vehicleEntity.vehicle_id = vehicle.vehicle_id;
    vehicleEntity.alias = vehicle.alias;
    vehicleEntity.capacity = vehicle.capacity;
    vehicleEntity.created_at = vehicle.created_at;
    vehicleEntity.updated_at = vehicle.updated_at;
    vehicleEntity.deleted_at = vehicle.deleted_at;
    return vehicleEntity;
  }

  mapToDomain(vehicleEntity: VehicleEntity): Vehicle {
    return VehicleFactory.create(vehicleEntity);
  }
}
