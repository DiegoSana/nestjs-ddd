import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RouteEntity } from '../entities/route.entity';
import { RouteRepository } from 'src/route/domain/entities/route.repository';
import { IRoute, Route } from 'src/route/domain/entities/route';

@Injectable()
export class RouteRepositoryImpl
  extends Repository<RouteEntity>
  implements RouteRepository
{
  constructor(
    @InjectRepository(RouteEntity)
    private routeRepository: Repository<RouteEntity>,
  ) {
    super(
      routeRepository.target,
      routeRepository.manager,
      routeRepository.queryRunner,
    );
  }

  async getById(id: number): Promise<IRoute | null> {
    return this.routeRepository
      .findOne({ where: { id: id } })
      .then((route: RouteEntity | null) => {
        if (!route) return null;
        return this.mapToDomain(route);
      });
  }

  async createRoute(route: IRoute): Promise<IRoute> {
    return this.routeRepository
      .save(this.mapToOrm(route))
      .then((routeEntity: RouteEntity) => {
        return this.mapToDomain(routeEntity);
      });
  }

  async updateRoute(route: IRoute): Promise<IRoute | null> {
    return this.routeRepository
      .update({ id: route.id }, { ...route })
      .then((result: UpdateResult) => {
        if (!result.affected) return null;
        return this.routeRepository.findOne({ where: { id: route.id } });
      })
      .then((routeEntity: RouteEntity) => {
        if (!routeEntity) return null;
        return this.mapToDomain(routeEntity);
      });
  }

  async deleteRoute(id: number): Promise<boolean> {
    const result = await this.routeRepository.softDelete(id);
    return result.affected > 0;
  }

  mapToOrm(route: IRoute): RouteEntity {
    const vehicleEntity: RouteEntity = new RouteEntity();
    Object.assign(vehicleEntity, route);
    return vehicleEntity;
  }

  mapToDomain(routeEntity: RouteEntity): Route {
    return new Route(routeEntity);
  }
}
