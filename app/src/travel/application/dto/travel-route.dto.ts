import { ITravelRoute } from 'src/travel/domain/entities/travel-route';

export class TravelRouteUseCaseRsponseDto {
  readonly id: number;
  readonly name: string;
  readonly from: string;
  readonly to: string;

  constructor(travelRoute: ITravelRoute) {
    this.id = travelRoute.id;
    this.name = travelRoute.name;
    this.from = travelRoute.from;
    this.to = travelRoute.to;
  }
}
