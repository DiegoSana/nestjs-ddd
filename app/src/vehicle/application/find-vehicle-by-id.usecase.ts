import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../domain/entities/vehicle.repository';
import {
  FindVehicleByIdUseCaseRequestDto,
  FindVehicleByIdUseCaseResponseDto,
} from './find-vehicle-by-id.usecase.dto';
import { Vehicle } from '../domain/entities/vehicle';
import { VehicleNotFoundApplicationException } from './exceptions/application.exceptions';
import { repositoryTokens } from 'src/constants/constants';

@Injectable()
export class FindVehicleByIdUseCase {
  constructor(
    @Inject(repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(
    findVehicleByIdUseCaseRequestDto: FindVehicleByIdUseCaseRequestDto,
  ): Promise<FindVehicleByIdUseCaseResponseDto | null> {
    return this.vehicleRepository
      .getById(findVehicleByIdUseCaseRequestDto.id)
      .then((vehicle: Vehicle | null) => {
        if (!vehicle) {
          throw new VehicleNotFoundApplicationException('Vehicle not found.');
        }
        return new FindVehicleByIdUseCaseResponseDto(vehicle);
      });
  }
}
