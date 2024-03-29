import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(dto as Category);
    return category;
  }

  async upsert(name: string) {
    return this.categoryRepository.upsert({ name } as Category);
  }

  async findAll() {
    return await this.categoryRepository.findAll({
      attributes: ['name'],
    });
  }
}
