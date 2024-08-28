import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { useCaseProvider } from './application/usecase.providers';
import { repositoryTokens } from 'src/constants/constants';
import { TravelsController } from './interface/controllers/travels.controller';
import { TravelRepositoryImpl } from './infrastructure/repository/travel.repository.impl';
import { TravelEntity } from './infrastructure/entities/travel.entity';
import { TravelService } from './domain/services/travel.service';

@Module({
  imports: [TypeOrmModule.forFeature([TravelEntity])],
  providers: [
    {
      provide: repositoryTokens.TRAVEL_REPOSITORY_IMPL_TOKEN,
      useClass: TravelRepositoryImpl,
    },
    TravelService,
    ...useCaseProvider,
  ],
  controllers: [TravelsController],
  exports: [TravelsModule],
})
export class TravelsModule {}
