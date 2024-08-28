import { Inject, Injectable } from '@nestjs/common';

import { repositoryTokens } from 'src/constants/constants';
import { RouteRepository } from '../domain/entities/route.repository';
import { RouteUseCaseRespnseDto } from './route.usecase.dto';
import { FindRouteByIdUseCaseRequestDto } from './find-route-by-id.usecase.dto';
import { RouteNotFoundApplicationException } from './exceptions/application.exceptions';
import { IRoute } from '../domain/entities/route';

@Injectable()
export class FindRouteByIdUseCase {
  constructor(
    @Inject(repositoryTokens.ROUTE_REPOSITORY_IMPL_TOKEN)
    private readonly routeRepository: RouteRepository,
  ) {}

  execute(
    findRouteByIdUseCaseRequestDto: FindRouteByIdUseCaseRequestDto,
  ): Promise<RouteUseCaseRespnseDto> {
    return this.routeRepository
      .getById(findRouteByIdUseCaseRequestDto.id)
      .then((route: IRoute | null) => {
        if (!route) {
          throw new RouteNotFoundApplicationException('Route not found.');
        }
        return new RouteUseCaseRespnseDto(route);
      });
  }
}
