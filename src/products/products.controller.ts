import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';
import { CreateProductDto } from './dto/crate-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Post('create-product')
  createProduct(@Body() product: CreateProductDto) {
    return this.client.send('products.create', product).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }

  @Get('get-products-for-user/:id')
  getProductsForUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('products.getbyid', { id: id }).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }
}
