import { IsString, IsEnum, IsEmail, Validate, IsNotEmpty } from 'class-validator';
import { IsCpfOrCnpj } from 'src/utils/validators/isCpfOrCnpj';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(IsCpfOrCnpj, {
    message: 'O documento deve ser um CPF ou CNPJ válido.',
  })
  cpf_cnpj: string;

  @IsString()
  balance: number;

  @IsNotEmpty()
  @IsEnum(
    ['common', 'merchant'], 
    {
      message: 'O tipo de usuário deve ser "common" ou "merchant"',
    }
  )
  user_type?: 'common' | 'merchant';

  constructor(user: UserDto) {
    this.full_name = user.full_name;
    this.email = user.email;
    this.cpf_cnpj = user.cpf_cnpj;
    this.balance = user.balance;
    this.user_type = user.user_type;
    
  }
}