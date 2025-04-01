import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/nats/nats.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProductsController],
  imports: [NatsModule, AuthModule, CommonModule],
})
export class ProductsModule {}
