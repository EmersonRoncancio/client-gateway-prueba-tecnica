import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() register: RegisterDto) {
    return this.client.send('register.user.or.admin', register).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.client.send('login.user.or.admin', login).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('get-user')
  getUser() {
    return this.client.send('get.user.or.admin', {}).pipe(
      catchError((err) => {
        throw new RpcException(err as string);
      }),
    );
  }
}
