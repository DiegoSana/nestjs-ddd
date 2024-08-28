import { CreateVehicleUseCase } from './create-vehicle.usecase';
import { DeleteVehicleUseCase } from './delete-vehicle.usecase';
import { FindVehicleByIdUseCase } from './find-vehicle-by-id.usecase';
import { UpdateVehicleUseCase } from './update-vehicle.usecase';

export const useCaseProvider = [
  CreateVehicleUseCase,
  UpdateVehicleUseCase,
  DeleteVehicleUseCase,
  FindVehicleByIdUseCase,
];
