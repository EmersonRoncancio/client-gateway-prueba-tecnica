import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [AuthController],
  imports: [CommonModule, NatsModule],
  providers: [],
})
export class AuthModule {}
