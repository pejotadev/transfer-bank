import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import Decimal from 'decimal.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':cpf_cnpj')
  async findOne(@Param('cpf_cnpj') cpf_cnpj: string): Promise<UserDto> {
    const user_finded = await this.usersService.findOneWhere({ cpf_cnpj });
    return new UserDto(user_finded);
  }

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<UserDto> {
    const userExists = await this.usersService.findOneWhere([
      { email: userDto.email},
      { cpf_cnpj: userDto.cpf_cnpj }
    ]);

    if (userExists) {
      throw new Error('Email already exists.');
    }

    const user = userDto as User;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const inserted_user = await this.usersService.create(user);

    return new UserDto(inserted_user);
  }

  @Post('add-balance/:id')
  async addBalance(
    @Param('id') id: string,
    @Body('balance') balance: number
  ): Promise<UserDto> {
    if(!balance){
      throw new Error('Balance is required.');
    }

    const user = await this.usersService.findOne(id);

    const old_balance = new Decimal(user.balance);
    const add_balance = new Decimal(balance);

    user.balance = old_balance.plus(add_balance).toNumber();

    const updated_user = await this.usersService.update(id, user);

    return new UserDto(updated_user);
  }
}
