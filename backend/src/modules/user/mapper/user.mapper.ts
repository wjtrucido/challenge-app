import { User } from '../entity/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';

export class UserMapper {
  static createUserResponseDtoFrom(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
