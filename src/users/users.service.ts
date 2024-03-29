import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { USERS_REPOSITORY } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: string, user: User): Promise<any> {
    return await this.usersRepository.update(id, user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneWhere(
    where: FindOptionsWhere<User>[] | FindOptionsWhere<User>
  ): Promise<User> {
    return await this.usersRepository.findOne({ where });
  }
}
