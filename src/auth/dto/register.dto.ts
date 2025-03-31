import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({}, { message: 'Password is not strong enough' })
  password: string;

  @IsEnum(['user', 'admin'], {
    message: 'Role must be either user or admin',
  })
  @IsOptional()
  role: string;
}
