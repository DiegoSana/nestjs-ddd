import { ITravel } from './travel';

export interface TravelRepository {
  getById: (id: number) => Promise<ITravel | null>;
  createTravel: (travel: ITravel) => Promise<ITravel>;
  updateTravel: (travel: ITravel) => Promise<ITravel>;
  deleteTravel: (id: number) => Promise<boolean>;
}
