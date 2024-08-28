import { Inject, Injectable } from '@nestjs/common';

import { VehicleRepository } from '../entities/vehicle.repository';
import { repositoryTokens } from 'src/constants/constants';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN)
    private vehicleRepository: VehicleRepository,
  ) {}
}
