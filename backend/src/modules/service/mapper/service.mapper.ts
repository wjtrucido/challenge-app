import { Service } from '../entity/service.entity';
import { ServiceResponseDto } from '../dto/service-response.dto';

export class ServiceMapper {
  static createServiceResponseDtoFrom(service: Service): ServiceResponseDto {
    return {
      id: service.id,
      description: service.description,
    };
  }
}
