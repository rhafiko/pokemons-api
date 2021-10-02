import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredencialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredencialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassord = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassord,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
