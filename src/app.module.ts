import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, CommonModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
