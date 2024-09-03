import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceResponseDto } from '../dto/service-response.dto';
import { ServiceMapper } from '../mapper/service.mapper';
import { ValidateObjectId } from '../../../common/pipe/validate-object-id-pipe';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createServiceRequestDto: CreateServiceRequestDto,
  ): Promise<ServiceResponseDto> {
    const createdService = await this.serviceService.create(
      createServiceRequestDto,
    );
    return ServiceMapper.createServiceResponseDtoFrom(createdService);
  }

  @Get()
  async findAll(
    @Query() paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ServiceResponseDto>> {
    const paginatedServices =
      await this.serviceService.findAll(paginationParams);
    const serviceResponseDtos = paginatedServices.data.map(
      ServiceMapper.createServiceResponseDtoFrom,
    );
    return {
      ...paginatedServices,
      data: serviceResponseDtos,
    };
  }

  @Get(':serviceId')
  async findOne(
    @Param('serviceId', ValidateObjectId) serviceId: string,
  ): Promise<ServiceResponseDto> {
    const foundService = await this.serviceService.findById(serviceId);
    return ServiceMapper.createServiceResponseDtoFrom(foundService);
  }

  @Patch(':serviceId')
  async update(
    @Param('serviceId', ValidateObjectId) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceResponseDto> {
    const updatedService = await this.serviceService.update(
      serviceId,
      updateServiceDto,
    );
    return ServiceMapper.createServiceResponseDtoFrom(updatedService);
  }

  @Patch('desactivate/:serviceId')
  desactivate(
    @Param('serviceId', ValidateObjectId) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    this.serviceService.update(serviceId, updateServiceDto);
    return {
      message: `Se ha desactivado el servicio con id ${serviceId}`,
    };
  }
}
