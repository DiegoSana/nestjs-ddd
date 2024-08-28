import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRouteUseCase } from 'src/route/application/create-route.usecase';
import { RouteResponseDto } from '../dto/response/route.dto';
import comonFilters from 'src/libs/comon-filters';
import { RouteUseCaseRespnseDto } from 'src/route/application/route.usecase.dto';
import { FindRouteByIdUseCase } from 'src/route/application/find-route-by-id.usecase';
import { RouteCreateRequestDto } from '../dto/request/create-route.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Routes')
@UseFilters(...comonFilters)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin'])
@Controller('routes')
export class RoutesController {
  constructor(
    private readonly createRouteUseCase: CreateRouteUseCase,
    private readonly findRouteByIdUseCase: FindRouteByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Get route by ID' })
  @ApiResponse({
    status: 200,
    description: 'Vehicle',
    type: RouteResponseDto,
  })
  @Get(':routeId')
  getVehicleById(
    @Param('routeId') routeId: number,
  ): Promise<RouteResponseDto | null> {
    return this.findRouteByIdUseCase
      .execute({ id: routeId })
      .then((findRouteByIdUseCaseResponseDto: RouteUseCaseRespnseDto) => {
        return new RouteResponseDto(findRouteByIdUseCaseResponseDto);
      });
  }

  @ApiOperation({ summary: 'Create route' })
  @ApiResponse({
    status: 200,
    description: 'Route created',
    type: RouteResponseDto,
  })
  @Post()
  createRoute(
    @Body() createRouteDto: RouteCreateRequestDto,
  ): Promise<RouteResponseDto> {
    return this.createRouteUseCase
      .execute(createRouteDto)
      .then((createRouteUseCaseResponseDto: RouteUseCaseRespnseDto) => {
        return new RouteResponseDto({
          id: createRouteUseCaseResponseDto.id,
          from: createRouteUseCaseResponseDto.from,
          to: createRouteUseCaseResponseDto.to,
          name: createRouteUseCaseResponseDto.name,
          created_at: createRouteUseCaseResponseDto.created_at,
          updated_at: createRouteUseCaseResponseDto.updated_at,
        });
      });
  }
}
