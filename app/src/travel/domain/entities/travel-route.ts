export type TravelRouteProperties = {
  id?: number;
  name: string;
  from: string;
  to: string;
};

export interface ITravelRoute {
  readonly id?: number;
  readonly name: string;
  readonly from: string;
  readonly to: string;
}

export class TravelRoute implements ITravelRoute {
  readonly id?: number;
  readonly name: string;
  readonly from: string;
  readonly to: string;

  constructor(properties: TravelRouteProperties) {
    Object.assign(this, properties);
  }
}
