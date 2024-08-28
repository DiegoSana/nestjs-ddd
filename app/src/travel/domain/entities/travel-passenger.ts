export type TravelPassengerProperties = Required<{
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  identification: string;
}>;

export interface ITravelPassenger {
  readonly id: number;
  readonly user_id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly identification: string;
}

export class TravelPassenger implements ITravelPassenger {
  readonly id: number;
  readonly user_id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly identification: string;

  constructor(properties: TravelPassengerProperties) {
    Object.assign(this, properties);
  }
}
