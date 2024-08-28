import { Inject, Injectable } from '@nestjs/common';

import { TravelRepository } from '../domain/entities/travel.repository';
import { TravelUseCaseRespnseDto } from './dto/travel.dto';
import { ITravel, Travel } from '../domain/entities/travel';
import { TravelDriver } from '../domain/entities/travel-driver';
import { TravelRoute } from '../domain/entities/travel-route';
import { repositoryTokens } from 'src/constants/constants';
import { CreateTravelUseCaseRequestDto } from './dto/create-travel.dto';

@Injectable()
export class CreateTravelUseCase {
  constructor(
    @Inject(repositoryTokens.TRAVEL_REPOSITORY_IMPL_TOKEN)
    private readonly travelRepository: TravelRepository,
  ) {}

  execute(
    createTravelUseCaseDto: CreateTravelUseCaseRequestDto,
  ): Promise<TravelUseCaseRespnseDto> {
    // TODO: get from divers repo
    const driver = new TravelDriver({
      first_name: 'Diego',
      last_name: 'Sanabria',
      license: '123',
    });
    // TODO: get from routes repo
    const route = new TravelRoute({
      name: 'Centro - Llao Llao',
      from: 'Centro',
      to: 'Llao Llao',
    });

    return this.travelRepository
      .createTravel(
        new Travel({
          date: createTravelUseCaseDto.date,
          driver: driver,
          route: route,
          status: 1,
        }),
      )
      .then((travel: ITravel) => {
        return new TravelUseCaseRespnseDto(travel);
      });
  }
}
