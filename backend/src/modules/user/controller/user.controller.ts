import { Controller } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserResponseDto } from '../dto/user.response.dto';
import { Param, Get } from '@nestjs/common';
import { UserMapper } from '../mapper/user.mapper';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<UserResponseDto> {
    const foundUser = await this.userService.findByEmail(email);
    return UserMapper.createUserResponseDtoFrom(foundUser);
  }
}
