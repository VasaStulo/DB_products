import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Manufacturer } from './entities/manufacturer.model';
import { Category } from '../category/entities/category.model';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer)
    private manufacturerRepository: typeof Manufacturer,
  ) {}

  async createManufacturer(dto: CreateManufacturerDto) {
    const manufacturer = await this.manufacturerRepository.create(
      dto as Manufacturer,
    );
    return manufacturer;
  }

  async upsert(name: string) {
    return this.manufacturerRepository.upsert({ name } as Manufacturer);
  }

  async findAll() {
    return await this.manufacturerRepository.findAll({
      attributes: ['name'],
    });
  }
}

// findOne(id: number) {
//   return `This action returns a #${id} manufacturer`;
// }
//
// update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
//   return `This action updates a #${id} manufacturer`;
// }
//
// remove(id: number) {
//   return `This action removes a #${id} manufacturer`;
// }
// }
