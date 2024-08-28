import { ITravel } from 'src/travel/domain/entities/travel';

export class CompleteTravelUseCaseRequestDto {
  readonly id: number;
  readonly comment: string;
  readonly date: Date;
}

export class CompleteTravelUseCaseResponseDto {
  readonly id: number;
  readonly comment: string;
  readonly date: Date;
  readonly status: number;

  constructor(travel: ITravel) {
    this.id = travel.id;
    this.comment = 'Todo comment';
    this.date = travel.updated_at; // TODO complete date logic
    this.status = travel.status;
  }
}
