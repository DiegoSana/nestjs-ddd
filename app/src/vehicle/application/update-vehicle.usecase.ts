import { Inject, Injectable } from '@nestjs/common';

import { VehicleRepository } from '../domain/entities/vehicle.repository';
import {
  UpdateVehicleUseCaseRequestDto,
  UpdateVehicleUseCaseRespnseDto,
} from './update-vehicle.usecase.dto';
import { Vehicle } from '../domain/entities/vehicle';
import { VehicleNotFoundApplicationException } from './exceptions/application.exceptions';
import { repositoryTokens } from 'src/constants/constants';
import { VehicleFactory } from '../domain/entities/vehicle.factory';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject(repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(
    updateVehicleUseCaseDto: UpdateVehicleUseCaseRequestDto,
  ): Promise<UpdateVehicleUseCaseRespnseDto | null> {
    return this.vehicleRepository
      .updateVehicle(VehicleFactory.create(updateVehicleUseCaseDto))
      .then((vehicle: Vehicle | null) => {
        if (!vehicle) {
          throw new VehicleNotFoundApplicationException('Vehicle not found.');
        }
        return new UpdateVehicleUseCaseRespnseDto(vehicle);
      });
  }
}
