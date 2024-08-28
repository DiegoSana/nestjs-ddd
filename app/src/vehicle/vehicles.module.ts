import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './domain/services/vehicle.service';
import { VehicleRepositoryImpl } from './infrastructure/repository/vehicle.repository.impl';
import { VehiclesController } from './interface/controllers/vehicles.controller';
import { VehicleEntity } from './infrastructure/entities/vehicle.entity';
import { useCaseProvider } from './application/usecase.providers';
import { repositoryTokens } from 'src/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [
    {
      provide: repositoryTokens.VEHICLE_REPOSITORY_IMPL_TOKEN,
      useClass: VehicleRepositoryImpl,
    },
    VehicleService,
    ...useCaseProvider,
  ],
  controllers: [VehiclesController],
  exports: [VehiclesModule],
})
export class VehiclesModule {}
