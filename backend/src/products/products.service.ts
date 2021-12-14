import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/products.model';
import { UniqueConstraintError } from 'sequelize';
import { Manufacturer } from '../manufacturer/entities/manufacturer.model';
import { Category } from '../category/entities/category.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { NewProductDto } from './dto/new-product-dto';
import { CategoryService } from '../category/category.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { log } from 'util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
  ) {}

  // 2 пункт тз
  async createProduct(dto: NewProductDto) {
    try {
      const product = new Product();
      product.name = dto.product_name;
      product.cost = dto.cost;
      product.disk = dto.disk;
      product.memory = dto.memory;
      product.min_ram = dto.min_ram;
      const category = await this.categoryService.upsert(dto.category_name);
      console.log(category);
      const category_id = category[0].id;
      const manufacturer = await this.manufacturerService.upsert(
        dto.manufacturer_name,
      );
      console.log(category);
      const manufacturer_id = manufacturer[0].id;
      product.category_id = category_id;
      product.manufacturer_id = manufacturer_id;

      const obj = await product.save();
      return obj;
    } catch (e) {
      throw new ConflictException();
    }
  }

  async findAll() {
    return await this.productRepository.findAll({
      include: [
        {
          model: Manufacturer,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
      ],
    });
  }

  //1 пункт тз
  async findOne(getProductWithSomeDto) {
    try {
      const {
        product_name: name,
        category_name,
        manufacturer_name,
      } = getProductWithSomeDto;
      const category_id = (
        await Category.findOne({ where: { name: category_name } })
      )?.id;

      const manufacturer_id = (
        await Manufacturer.findOne({ where: { name: manufacturer_name } })
      )?.id;

      return await this.productRepository.findOne({
        where: {
          name,
          category_id,
          manufacturer_id,
        },
        attributes: ['disk', 'name', 'memory', 'min_ram', 'cost'],
        include: [
          {
            model: Manufacturer,
            attributes: ['name'],
          },
          {
            model: Category,
            attributes: ['name'],
          },
        ],
      });
    } catch (ex) {
      throw new NotFoundException();
    }
  }
  //TODO ЕСЛИ ЧТО ТО СОВПАДЕТ У ОДНОГО ОБЪЕКТА И ЧТО ТО У ДРУГОГО

  //
  // async update(product_id: number, updateProductDto: UpdateProductDto) {
  //   try {
  //     return await this.productRepository.update(updateProductDto, {
  //       where: { product_id },
  //     });
  //   } catch (e) {
  //     throw new ConflictException();
  //   }
  // }
  //пункт 3
  async findAnalog(analogProductDto) {
    try {
      const { product_name: name } = analogProductDto;
      const category_id = (
        await this.productRepository.findOne({
          raw: true,
          where: {
            name,
          },
          include: [
            {
              model: Category,
              attributes: ['id'],
            },
          ],
        })
      ).category_id;
      return await this.productRepository.findAll({
        where: {
          category_id,
        },
        attributes: ['disk', 'name', 'memory', 'min_ram', 'cost'],
        include: [
          {
            model: Manufacturer,
            attributes: ['name'],
          },
          {
            model: Category,
            attributes: ['name'],
          },
        ],
      });
    } catch (ex) {
      throw new NotFoundException();
    }
  }

  // 4 пункт
  async findByFeature(findByFeatureDto) {
    try {
      const obj: any = {};
      for (const el in findByFeatureDto) {
        if (findByFeatureDto[el] !== '') {
          obj[el] = findByFeatureDto[el];
        }
      }
      if (obj.category_name) {
        const category_id = (
          await Category.findOne({ where: { name: obj.category_name } })
        )?.id;
        obj.category_id = category_id;
        delete obj.category_name;
      }
      if (obj.manufacturer_name) {
        const manufacturer_id = (
          await Manufacturer.findOne({ where: { name: obj.manufacturer_name } })
        )?.id;
        obj.manufacturer_id = manufacturer_id;
        delete obj.manufacturer_name;
      }
      const res = await this.productRepository.findAll({
        where: { ...obj },
        attributes: ['disk', 'name', 'memory', 'min_ram', 'cost'],
        include: [
          {
            model: Manufacturer,
            attributes: ['name'],
          },
          {
            model: Category,
            attributes: ['name'],
          },
        ],
      });
      return res;
    } catch (ex) {
      throw new NotFoundException();
    }
  }
}
