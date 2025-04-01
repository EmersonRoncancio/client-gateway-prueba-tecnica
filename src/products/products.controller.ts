import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('create-product')
  createProduct() {
    return this.client.send('products.create', {}).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }
}
