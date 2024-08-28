import { Inject, Injectable } from '@nestjs/common';
import { CreateRouteUseCaseRequestDto } from './create-route.usecase.dto';
import { RouteRepository } from '../domain/entities/route.repository';
import { IRoute, Route } from '../domain/entities/route';
import { repositoryTokens } from 'src/constants/constants';
import { RouteUseCaseRespnseDto } from './route.usecase.dto';

@Injectable()
export class CreateRouteUseCase {
  constructor(
    @Inject(repositoryTokens.ROUTE_REPOSITORY_IMPL_TOKEN)
    private readonly routeRepository: RouteRepository,
  ) {}

  execute(
    createRouteUseCaseDto: CreateRouteUseCaseRequestDto,
  ): Promise<RouteUseCaseRespnseDto> {
    return this.routeRepository
      .createRoute(new Route({ ...createRouteUseCaseDto }))
      .then((route: IRoute) => {
        return new RouteUseCaseRespnseDto(route);
      });
  }
}
