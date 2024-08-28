import { ITravelPassenger } from 'src/travel/domain/entities/travel-passenger';

export class TravelPassengerUseCaseRsponseDto {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly identification: string;

  constructor(travelRoute: ITravelPassenger) {
    this.id = travelRoute.id;
    this.first_name = travelRoute.first_name;
    this.last_name = travelRoute.last_name;
    this.identification = travelRoute.identification;
  }
}
