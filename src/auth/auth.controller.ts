import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('register')
  register() {
    return this.client.send('register.user.or.admin', {}).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }

  @Post('login')
  login() {
    return this.client.send('login.user.or.admin', {}).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }
}
