import { Body, Controller, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import comonFilters from 'src/libs/comon-filters';
import { CreateTravelUseCase } from 'src/travel/application/create-travel.usecase';
import { TravelResponseDto } from '../dto/response/travel.dto';
import { TravelUseCaseRespnseDto } from 'src/travel/application/dto/travel.dto';
import { UpdateTravelUseCase } from 'src/travel/application/update-travel.usecase';
import { CompleteTravelUseCaseResponseDto } from 'src/travel/application/dto/complete-travel.dto';
import { CompleteTravelUseCase } from 'src/travel/application/complete-travel.usecase';
import { TravelCreateRequestDto } from '../dto/request/create-travel.dto';
import { TravelUpdateRequestDto } from '../dto/request/update-travel.dto';
import { TravelCompleteResponseDto } from '../dto/response/complete-travel.dto';
import { TravelCompleteRequestDto } from '../dto/request/complete-travel.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Travels')
@ApiBearerAuth()
@UseFilters(...comonFilters)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('travels')
export class TravelsController {
  constructor(
    private readonly createTravelUseCase: CreateTravelUseCase,
    private readonly updateTravelUseCase: UpdateTravelUseCase,
    private readonly completeTravelUseCase: CompleteTravelUseCase,
  ) {}

  @ApiOperation({ summary: 'Create travel' })
  @ApiResponse({
    status: 200,
    description: 'Travel',
    type: TravelResponseDto,
  })
  @Post()
  createTravel(
    @Body() createTravelDto: TravelCreateRequestDto,
  ): Promise<TravelResponseDto | null> {
    return this.createTravelUseCase
      .execute(createTravelDto)
      .then((createTravelUseCaseRespnseDto: TravelUseCaseRespnseDto) => {
        return new TravelResponseDto(createTravelUseCaseRespnseDto);
      });
  }

  @ApiOperation({ summary: 'Update travel' })
  @ApiResponse({
    status: 200,
    description: 'Travel',
    type: TravelResponseDto,
  })
  @Put(':travelId')
  updateTravel(
    @Param('travelId') travelId: number,
    @Body() updateTravelDto: TravelUpdateRequestDto,
  ): Promise<TravelResponseDto | null> {
    return this.updateTravelUseCase
      .execute({ id: travelId, ...updateTravelDto })
      .then((travelUseCaseRespnseDto: TravelUseCaseRespnseDto) => {
        return new TravelResponseDto(travelUseCaseRespnseDto);
      });
  }

  @ApiOperation({ summary: 'Complete travel' })
  @ApiResponse({
    status: 200,
    description: 'Travel status',
    type: TravelCompleteResponseDto,
  })
  @Post('complete')
  completeTravel(
    @Body() completeTravelDto: TravelCompleteRequestDto,
  ): Promise<TravelCompleteResponseDto> {
    return this.completeTravelUseCase
      .execute(completeTravelDto)
      .then(
        (completeTravelUseCaseRespnseDto: CompleteTravelUseCaseResponseDto) => {
          return new TravelCompleteResponseDto(completeTravelUseCaseRespnseDto);
        },
      );
  }
}
