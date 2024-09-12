import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateClientRequestDto } from '../dto/create-client-request.dto';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { client } from '../entity/client.entity';
import { ClientRepository } from '../repository/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) { }

  async create(createClientDto: CreateClientRequestDto): Promise<client> {
    const foundClientWithSameEmail = await this.clientRepository.findBy({
      email: createClientDto.email,
    });

    if (foundClientWithSameEmail) {
      throw new BadRequestException('client is already taken');
    }
    return this.clientRepository.create(createClientDto);
  }

  async findAll(
    paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<client>> {
    return this.clientRepository.findAll(paginationParams);
  }

  async findById(clientId: string): Promise<client> {
    const foundClient = await this.clientRepository.findById(clientId);
    if (!foundClient) {
      throw new NotFoundException(`client with ID ${clientId} not found`);
    }
    return foundClient;
  }

  async findByEmail(email: string): Promise<client> {
    const foundUser = await this.clientRepository.findBy({ email });
    if (!foundUser) {
      throw new NotFoundException(`client with email ${email} not found`);
    }
    return foundUser;
  }

  async update(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<client> {
    const foundClient = await this.clientRepository.findById(clientId);
    if (!foundClient) {
      throw new NotFoundException(`client with ID ${clientId} not found`);
    }

    const { email: newClientEmail } = updateClientDto;
    if (newClientEmail) {
      const foundClientWithSameEmail = await this.clientRepository.findBy({
        email: updateClientDto.email,
      });
      if (foundClientWithSameEmail) {
        throw new BadRequestException('email is already taken');
      }
    }

    return this.clientRepository.update(clientId, updateClientDto);
  }
}
