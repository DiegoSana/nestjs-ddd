import { Inject, Injectable } from '@nestjs/common';

import { TravelRepository } from '../domain/entities/travel.repository';
import { TravelUseCaseRespnseDto } from './dto/travel.dto';
import { ITravel, Travel } from '../domain/entities/travel';
import { TravelDriver } from '../domain/entities/travel-driver';
import { TravelRoute } from '../domain/entities/travel-route';
import { repositoryTokens } from 'src/constants/constants';
import { UpdateTravelUseCaseRequestDto } from './dto/update-travel.dto';

@Injectable()
export class UpdateTravelUseCase {
  constructor(
    @Inject(repositoryTokens.TRAVEL_REPOSITORY_IMPL_TOKEN)
    private readonly travelRepository: TravelRepository,
  ) {}

  execute(
    updateTravelUseCaseDto: UpdateTravelUseCaseRequestDto,
  ): Promise<TravelUseCaseRespnseDto> {
    // TODO: get from divers repo
    const driver = new TravelDriver({
      first_name: 'Diego 2',
      last_name: 'Sanabria 2',
      license: '123',
    });
    // TODO: get from routes repo
    const route = new TravelRoute({
      name: 'Centro - Llao Llao 2',
      from: 'Centro 2',
      to: 'Llao Llao 2',
    });

    return this.travelRepository
      .updateTravel(
        new Travel({
          id: updateTravelUseCaseDto.id,
          date: updateTravelUseCaseDto.date,
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
