import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';
import { ResponseType } from '../interfaces/response-type.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const { user, token: newToken }: ResponseType = await firstValueFrom(
        this.client.send('verify.user.or.admin', { token: token }),
      );

      request['user'] = user;

      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
