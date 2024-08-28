import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from '../domain/entities/vehicle.repository';
import {
  DeleteVehicleUseCaseRequestDto,
  DeleteVehicleUseCaseResponseDto,
} from './delete-vehicle.usecase.dto';
import { repositoryTokens } from 'src/constants/constants';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject(repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  execute(
    deleteVehicleUseCaseDto: DeleteVehicleUseCaseRequestDto,
  ): Promise<DeleteVehicleUseCaseResponseDto> {
    return this.vehicleRepository
      .deleteVehicle(deleteVehicleUseCaseDto.id)
      .then((success: boolean) => {
        return new DeleteVehicleUseCaseResponseDto(success);
      });
  }
}
