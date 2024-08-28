export type TravelDriverProperties = {
  id?: number;
  first_name: string;
  last_name: string;
  license: string;
};

export interface ITravelDriver {
  readonly id?: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly license: string;
}

export class TravelDriver implements ITravelDriver {
  readonly id?: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly license: string;

  constructor(properties: TravelDriverProperties) {
    Object.assign(this, properties);
  }
}
