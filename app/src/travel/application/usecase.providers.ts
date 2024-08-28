import { CompleteTravelUseCase } from './complete-travel.usecase';
import { CreateTravelUseCase } from './create-travel.usecase';
import { UpdateTravelUseCase } from './update-travel.usecase';

export const useCaseProvider = [
  CreateTravelUseCase,
  UpdateTravelUseCase,
  CompleteTravelUseCase,
];
