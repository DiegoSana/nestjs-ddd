import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../domain/entities/vehicle.repository';
import {
  CreateVehicleUseCaseRequestDto,
  CreateVehicleUseCaseRespnseDto,
} from './create-vehicle.usecase.dto';
import { Vehicle } from '../domain/entities/vehicle';
import { repositoryTokens } from 'src/constants/constants';
import { VehicleFactory } from '../domain/entities/vehicle.factory';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject(repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(
    createVehicleUseCaseDto: CreateVehicleUseCaseRequestDto,
  ): Promise<CreateVehicleUseCaseRespnseDto> {
    return this.vehicleRepository
      .createVehicle(VehicleFactory.create({ ...createVehicleUseCaseDto }))
      .then((vehicle: Vehicle) => {
        return new CreateVehicleUseCaseRespnseDto(vehicle);
      });
  }
}
