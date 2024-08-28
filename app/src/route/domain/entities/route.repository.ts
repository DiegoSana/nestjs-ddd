import { IRoute } from './route';

export interface RouteRepository {
  getById: (id: number) => Promise<IRoute | null>;
  createRoute: (route: IRoute) => Promise<IRoute>;
  updateRoute: (route: IRoute) => Promise<IRoute>;
  deleteRoute: (id: number) => Promise<boolean>;
}
