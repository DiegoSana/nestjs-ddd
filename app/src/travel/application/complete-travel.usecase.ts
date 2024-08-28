import { Injectable } from '@nestjs/common';

import { ITravel } from '../domain/entities/travel';
import {
  CompleteTravelUseCaseRequestDto,
  CompleteTravelUseCaseResponseDto,
} from './dto/complete-travel.dto';
import { TravelService } from '../domain/services/travel.service';
import { TravelNotFoundException } from './exceptions/application.exceptions';

@Injectable()
export class CompleteTravelUseCase {
  constructor(private readonly travelService: TravelService) {}

  execute(
    completeTravelUseCaseDto: CompleteTravelUseCaseRequestDto,
  ): Promise<CompleteTravelUseCaseResponseDto> {
    return this.travelService
      .finish(completeTravelUseCaseDto.id, completeTravelUseCaseDto.comment)
      .then((travel: ITravel) => {
        if (!travel) {
          throw new TravelNotFoundException('Travel not found.');
        }
        return new CompleteTravelUseCaseResponseDto(travel);
      });
  }
}
