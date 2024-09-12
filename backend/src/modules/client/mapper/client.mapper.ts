import { client } from '../entity/client.entity';
import { ClientResponseDto } from '../dto/client-response.dto';

export class ClientMapper {
  static createClientResponseDtoFrom(client: client): ClientResponseDto {
    return {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      address: client.address,
    };
  }
}
