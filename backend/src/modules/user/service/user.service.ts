import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repositoy';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findBy({ email });
    if (!foundUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return foundUser;
  }
}
