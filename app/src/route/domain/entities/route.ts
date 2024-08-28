export type RouteEssentialProperties = Required<{
  name: string;
  from: string;
  to: string;
}>;

export type RouteOptionalProperties = Partial<{
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}>;

export type RouteProperties = RouteEssentialProperties &
  RouteOptionalProperties;

export interface IRoute {
  readonly id: number;
  name: string;
  from: string;
  to: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class Route implements IRoute {
  readonly id: number;
  name: string;
  from: string;
  to: string;
  readonly created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(properties: RouteProperties) {
    Object.assign(this, properties);
  }
}
