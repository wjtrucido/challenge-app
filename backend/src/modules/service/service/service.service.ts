import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entity/service.entity';
import { ServiceRepository } from '../repository/service.repository';

@Injectable()
export class ServiceService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async create(createServiceDto: CreateServiceRequestDto): Promise<Service> {
    const foundServiceWithSameDescription = await this.serviceRepository.findBy(
      {
        description: createServiceDto.description,
      },
    );

    if (foundServiceWithSameDescription) {
      throw new BadRequestException('Service is already taken');
    }
    return this.serviceRepository.create(createServiceDto);
  }

  async findAll(
    paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<Service>> {
    return this.serviceRepository.findAll(paginationParams);
  }

  async findById(serviceId: string): Promise<Service> {
    const foundService = await this.serviceRepository.findById(serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }
    return foundService;
  }

  async findByDescription(description: string): Promise<Service> {
    const foundUser = await this.serviceRepository.findBy({ description });
    if (!foundUser) {
      throw new NotFoundException(
        `Service with descrition ${description} not found`,
      );
    }
    return foundUser;
  }

  async update(
    serviceId: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const foundService = await this.serviceRepository.findById(serviceId);
    if (!foundService) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }

    const { description: newServiceDescription } = updateServiceDto;
    if (newServiceDescription) {
      const foundServiceWithSameDescription =
        await this.serviceRepository.findBy({
          description: updateServiceDto.description,
        });
      if (foundServiceWithSameDescription) {
        throw new BadRequestException('Description is already taken');
      }
    }

    return this.serviceRepository.update(serviceId, updateServiceDto);
  }

  async remove(id: string): Promise<void> {
    await this.serviceRepository.remove(id);
  }
}
