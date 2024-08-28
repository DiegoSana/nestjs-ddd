import { ITravelDriver } from 'src/travel/domain/entities/travel-driver';

export class TravelDriverUseCaseRsponseDto {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly license: string;

  constructor(travelDriver: ITravelDriver) {
    this.id = travelDriver.id;
    this.first_name = travelDriver.first_name;
    this.last_name = travelDriver.last_name;
    this.license = travelDriver.license;
  }
}
