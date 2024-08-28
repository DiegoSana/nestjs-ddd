import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { Vehicle } from 'src/vehicle/domain/entities/vehicle';
import { CreateVehicleRequestDto } from '../dto/request/create-vehicle.dto';
import { UpdateVehicleRequestDto } from '../dto/request/update-vehicle.dto';
import { Roles } from 'src/auth/roles.decorator';
import { VehicleResponseDto } from '../dto/response/vehicle.dto';
import { CreateVehicleUseCase } from 'src/vehicle/application/create-vehicle.usecase';
import { UpdateVehicleUseCase } from 'src/vehicle/application/update-vehicle.usecase';
import { CreateVehicleUseCaseRespnseDto } from 'src/vehicle/application/create-vehicle.usecase.dto';
import { FindVehicleByIdUseCase } from 'src/vehicle/application/find-vehicle-by-id.usecase';
import { FindVehicleByIdUseCaseResponseDto } from 'src/vehicle/application/find-vehicle-by-id.usecase.dto';
import { UpdateVehicleUseCaseRespnseDto } from 'src/vehicle/application/update-vehicle.usecase.dto';
import { DeleteVehicleUseCase } from 'src/vehicle/application/delete-vehicle.usecase';
import { DeleteVehicleUseCaseResponseDto } from 'src/vehicle/application/delete-vehicle.usecase.dto';
import { DeleteVehicleResponseDto } from '../dto/response/delete-vehicle.dto';
import filters from '../filters';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import comonFilters from 'src/libs/comon-filters';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VehicleFactory } from 'src/vehicle/domain/entities/vehicle.factory';

@ApiTags('Vehicles')
@UseFilters(...comonFilters, ...filters)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle',
    type: VehicleResponseDto,
  })
  @Get(':vehicleId')
  getVehicleById(
    @Param('vehicleId') vehicleId: number,
  ): Promise<VehicleResponseDto | null> {
    return this.findVehicleByIdUseCase
      .execute({ id: vehicleId })
      .then(
        (
          findVehicleByIdUseCaseResponseDto: FindVehicleByIdUseCaseResponseDto | null,
        ) => {
          if (!findVehicleByIdUseCaseResponseDto) {
            throw new BadRequestException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'Vehicle not found.',
              },
              'Vehicle not found.',
            );
          }
          return new VehicleResponseDto({
            id: findVehicleByIdUseCaseResponseDto.id,
            vehicle_id: findVehicleByIdUseCaseResponseDto.vehicle_id,
            alias: findVehicleByIdUseCaseResponseDto.alias,
            capacity: findVehicleByIdUseCaseResponseDto.capacity,
            created_at: findVehicleByIdUseCaseResponseDto.created_at,
          });
        },
      );
  }

  @ApiOperation({ summary: 'Create vehicle' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle created',
    type: VehicleResponseDto,
  })
  @Post()
  createVehicle(
    @Body() createVehicleDto: CreateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    return this.createVehicleUseCase
      .execute(createVehicleDto)
      .then(
        (createVehicleUseCaseResponseDto: CreateVehicleUseCaseRespnseDto) => {
          return new VehicleResponseDto({
            id: createVehicleUseCaseResponseDto.id,
            vehicle_id: createVehicleUseCaseResponseDto.vehicle_id,
            alias: createVehicleUseCaseResponseDto.alias,
            capacity: createVehicleUseCaseResponseDto.capacity,
            created_at: createVehicleUseCaseResponseDto.created_at,
          });
        },
      );
  }

  @ApiOperation({ summary: 'Edit vehicle' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle updated',
    type: VehicleResponseDto,
  })
  @Put(':vehicleId')
  updateVehicle(
    @Param('vehicleId') vehicleId: number,
    @Body() updateVehicleDto: UpdateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = VehicleFactory.create({ id: vehicleId, ...updateVehicleDto });
    return this.updateVehicleUseCase
      .execute({ ...vehicle })
      .then(
        (updateVehicleUseCaseResponseDto: UpdateVehicleUseCaseRespnseDto) => {
          return new VehicleResponseDto({
            id: updateVehicleUseCaseResponseDto.id,
            vehicle_id: updateVehicleUseCaseResponseDto.vehicle_id,
            alias: updateVehicleUseCaseResponseDto.alias,
            capacity: updateVehicleUseCaseResponseDto.capacity,
            created_at: updateVehicleUseCaseResponseDto.created_at,
          });
        },
      );
  }

  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle deleted',
    type: DeleteVehicleResponseDto,
  })
  @Delete(':vehicleId')
  deleteVehicleById(
    @Param('vehicleId') vehicleId: number,
  ): Promise<DeleteVehicleResponseDto> {
    return this.deleteVehicleUseCase
      .execute({ id: vehicleId })
      .then(
        (deleteVehicleUseCaseResponseDto: DeleteVehicleUseCaseResponseDto) => {
          return new DeleteVehicleResponseDto(
            deleteVehicleUseCaseResponseDto.success,
          );
        },
      );
  }
}
