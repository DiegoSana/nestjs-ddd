import { TravelComment } from './travel-comment';
import { TravelDriver } from './travel-driver';
import { TravelPassenger } from './travel-passenger';
import { TravelRoute } from './travel-route';

export type TravelEssentialProperties = Required<{
  route: TravelRoute;
  date: Date;
  status: number;
}>;

export type TravelOptionalProperties = Partial<{
  id: number;
  passengers: TravelPassenger[];
  comments: TravelComment[];
  driver: TravelDriver;
  created_at: Date;
  updated_at: Date;
}>;

export type TravelProperties = TravelEssentialProperties &
  TravelOptionalProperties;

export interface ITravel {
  readonly id: number;
  route: TravelRoute;
  date: Date;
  status: number;
  passengers?: TravelPassenger[];
  comments?: TravelComment[];
  driver?: TravelDriver;
  readonly created_at: Date;
  updated_at?: Date;
}

export class Travel implements ITravel {
  readonly id: number;
  route: TravelRoute;
  date: Date;
  status: number;
  passengers?: TravelPassenger[];
  comments?: TravelComment[];
  driver?: TravelDriver;
  readonly created_at: Date;
  updated_at?: Date;

  constructor(properties: TravelProperties) {
    this.id = properties.id;
    this.route = properties.route;
    this.date = properties.date;
    this.status = properties.status;
    this.passengers = properties.passengers;
    this.comments = properties.comments;
    this.driver = properties.driver;
    this.created_at = properties.created_at;
    this.updated_at = properties.updated_at;
  }
}
