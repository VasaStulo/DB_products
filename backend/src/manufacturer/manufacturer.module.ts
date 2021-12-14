import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Manufacturer } from './entities/manufacturer.model';

@Module({
  imports: [SequelizeModule.forFeature([Manufacturer])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
