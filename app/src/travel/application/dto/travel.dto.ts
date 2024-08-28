import { ITravel } from '../../domain/entities/travel';
import { ITravelPassenger } from '../../domain/entities/travel-passenger';
import { TravelDriverUseCaseRsponseDto } from './travel-driver.dto';
import { TravelPassengerUseCaseRsponseDto } from './travel-passenger.dto';
import { TravelRouteUseCaseRsponseDto } from './travel-route.dto';

export class TravelUseCaseRespnseDto {
  readonly id: number;
  readonly route: TravelRouteUseCaseRsponseDto;
  readonly driver: TravelDriverUseCaseRsponseDto;
  readonly date: Date;
  readonly passengers: TravelPassengerUseCaseRsponseDto[];
  readonly status: number;
  readonly created_at: Date;
  readonly updated_at?: Date;

  constructor(travel: ITravel) {
    this.id = travel.id;
    this.date = travel.date;
    this.status = travel.status;
    this.created_at = travel.created_at;
    this.updated_at = travel.updated_at;
    this.route = new TravelRouteUseCaseRsponseDto(travel.route);
    this.driver = new TravelDriverUseCaseRsponseDto(travel.driver);
    this.passengers = travel.passengers
      ? travel.passengers.map(
          (passenger: ITravelPassenger) =>
            new TravelPassengerUseCaseRsponseDto(passenger),
        )
      : [];
  }
}
