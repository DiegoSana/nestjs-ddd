import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { useCaseProvider } from './application/usecase.providers';
import { RoutesController } from './interface/controllers/routes.controller';
import { RouteRepositoryImpl } from './infrastructure/repository/route.repository.impl';
import { RouteEntity } from './infrastructure/entities/route.entity';
import { repositoryTokens } from 'src/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity])],
  providers: [
    {
      provide: repositoryTokens.ROUTE_REPOSITORY_IMPL_TOKEN,
      useClass: RouteRepositoryImpl,
    },
    ...useCaseProvider,
  ],
  controllers: [RoutesController],
  exports: [RoutesModule],
})
export class RoutesModule {}
