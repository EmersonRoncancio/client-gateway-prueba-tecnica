import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  price: number;

  @IsString()
  @IsUUID()
  iduser: string;
}
