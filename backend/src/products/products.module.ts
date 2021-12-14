import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from '../category/category.module';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    CategoryModule,
    ManufacturerModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
