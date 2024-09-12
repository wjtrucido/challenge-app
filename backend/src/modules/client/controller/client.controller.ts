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
import { ClientService } from '../service/client.service';
import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { PaginationParamsDto } from '../../../common/dto/pagination-params.dto';
import { CreateClientRequestDto } from '../dto/create-client-request.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientResponseDto } from '../dto/client-response.dto';
import { ClientMapper } from '../mapper/client.mapper';
import { ValidateObjectId } from '../../../common/pipe/validate-object-id-pipe';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createClientRequestDto: CreateClientRequestDto,
  ): Promise<ClientResponseDto> {
    const createdClient = await this.clientService.create(
      createClientRequestDto,
    );
    return ClientMapper.createClientResponseDtoFrom(createdClient);
  }

  @Get()
  async findAll(
    @Query() paginationParams: PaginationParamsDto,
  ): Promise<PaginatedResponseDto<ClientResponseDto>> {
    const paginatedClients = await this.clientService.findAll(paginationParams);
    const serviceResponseDtos = paginatedClients.data.map(
      ClientMapper.createClientResponseDtoFrom,
    );
    return {
      ...paginatedClients,
      data: serviceResponseDtos,
    };
  }

  @Get(':clientId')
  async findOne(
    @Param('clientId', ValidateObjectId) serviceId: string,
  ): Promise<ClientResponseDto> {
    const foundClient = await this.clientService.findById(serviceId);
    return ClientMapper.createClientResponseDtoFrom(foundClient);
  }

  @Patch(':clientId')
  async update(
    @Param('clientId', ValidateObjectId) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    const updatedClient = await this.clientService.update(
      clientId,
      updateClientDto,
    );
    return ClientMapper.createClientResponseDtoFrom(updatedClient);
  }

  @Patch('desactivate/:clientId')
  async desactivate(
    @Param('clientId', ValidateObjectId) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    this.clientService.update(clientId, updateClientDto);
    return {
      message: `Se ha desactivado el cliente con id ${clientId}`,
    };
  }
}
