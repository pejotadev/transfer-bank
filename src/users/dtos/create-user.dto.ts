import { IsString, IsEnum, IsEmail, Validate, IsNotEmpty } from 'class-validator';
import { IsCpfOrCnpj } from '../../utils/validators/isCpfOrCnpj';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ 
    message: 'O nome deve ser uma string', 
  })
  full_name?: string; 

  @IsNotEmpty()
  @IsEmail({}, {
    message: 'O email deve ser válido',
  })
  email?: string;

  @IsNotEmpty()
  @Validate(IsCpfOrCnpj, {
    message: 'O documento deve ser um CPF ou CNPJ válido.',
  })
  cpf_cnpj?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  @IsEnum(
    ['common', 'merchant'], 
    {
      message: 'O tipo de usuário deve ser "common" ou "merchant"',
    }
  )
  user_type: 'common' | 'merchant';
}