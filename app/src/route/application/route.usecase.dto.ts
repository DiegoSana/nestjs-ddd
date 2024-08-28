import { IRoute } from '../domain/entities/route';

export class RouteUseCaseRespnseDto {
  readonly id: number;
  readonly name: string;
  readonly from: string;
  readonly to: string;
  readonly created_at: Date;
  readonly updated_at?: Date;

  constructor(route: IRoute) {
    Object.assign(this, route);
  }
}
