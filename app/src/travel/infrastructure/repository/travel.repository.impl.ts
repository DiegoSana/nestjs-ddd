import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TravelEntity } from '../entities/travel.entity';
import { TravelRepository } from 'src/travel/domain/entities/travel.repository';
import { ITravel, Travel } from 'src/travel/domain/entities/travel';
import { TravelPassenger } from 'src/travel/domain/entities/travel-passenger';
import { TravelPassengerEntity } from '../entities/travel-passenger.entity';
import { TravelDriver } from 'src/travel/domain/entities/travel-driver';
import { TravelRoute } from 'src/travel/domain/entities/travel-route';
import { TravelRouteEntity } from '../entities/travel-route.entity';
import { TravelDriverEntity } from '../entities/travel-driver.entity';

@Injectable()
export class TravelRepositoryImpl
  extends Repository<TravelEntity>
  implements TravelRepository
{
  constructor(
    @InjectRepository(TravelEntity)
    private travelRepository: Repository<TravelEntity>,
  ) {
    super(
      travelRepository.target,
      travelRepository.manager,
      travelRepository.queryRunner,
    );
  }

  async getById(id: number): Promise<ITravel | null> {
    return this.travelRepository
      .findOne({
        where: { id: id },
        relations: {
          comments: true,
          route: true,
          driver: true,
          passengers: true
        },
      })
      .then((travel: TravelEntity | null) => {
        if (!travel) return null;
        return this.mapToDomain(travel);
      });
  }

  async createTravel(travel: ITravel): Promise<ITravel> {
    try {
      return this.travelRepository
        .save(this.mapToOrm(travel))
        .then((travelEntity: TravelEntity) => {
          return this.mapToDomain(travelEntity);
        });
    } catch (error) {
      const a = error;
    }
  }

  async updateTravel(travel: ITravel): Promise<ITravel | null> {
    return this.travelRepository
      .update({ id: travel.id }, { ...travel })
      .then((result: UpdateResult) => {
        if (!result.affected) return null;
        return this.travelRepository.findOne({
          where: { id: travel.id },
          relations: ['comments', 'route', 'driver', 'passengers'],
        });
      })
      .then((travelEntity: TravelEntity) => {
        if (!travelEntity) return null;
        return this.mapToDomain(travelEntity);
      });
  }

  async deleteTravel(id: number): Promise<boolean> {
    const result = await this.travelRepository.softDelete(id);
    return result.affected > 0;
  }

  mapToOrm(travel: ITravel): TravelEntity {
    const travelRouteEntity: TravelRouteEntity = new TravelRouteEntity();
    Object.assign(travelRouteEntity, travel.route);
    const travelDriverEntity: TravelDriverEntity = new TravelDriverEntity();
    Object.assign(travelDriverEntity, travel.driver);

    const travelEntity: TravelEntity = new TravelEntity();
    Object.assign(travelEntity, {
      ...travel,
      route: travelRouteEntity,
      driver: travelDriverEntity,
    });

    return travelEntity;
  }

  mapToDomain(travelEntity: TravelEntity): ITravel {
    return new Travel({
      ...travelEntity,
      passengers: travelEntity.passengers?.map(
        (passenger: TravelPassengerEntity) =>
          new TravelPassenger({
            id: passenger.id,
            first_name: passenger.first_name,
            last_name: passenger.last_name,
            identification: passenger.identification,
            user_id: passenger.user_id,
          }),
      ),
      driver: new TravelDriver(travelEntity.driver),
      route: new TravelRoute(travelEntity.route),
    });
  }
}
