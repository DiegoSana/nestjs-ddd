export class DeleteVehicleUseCaseRequestDto {
  readonly id: number;
}

export class DeleteVehicleUseCaseResponseDto {
  readonly success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
