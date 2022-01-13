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
import { Op, UniqueConstraintError } from 'sequelize';
import { Manufacturer } from '../manufacturer/entities/manufacturer.model';
import { Category } from '../category/entities/category.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { NewProductDto } from './dto/new-product-dto';
import { CategoryService } from '../category/category.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { log } from 'util';
import { CompatibilityDto } from './dto/compatibility-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
  ) {}

  async createProduct(newProductDto) {
    try {
      const product = new Product();
      product.name = newProductDto.product_name;
      product.cost = newProductDto.cost;
      product.disk = newProductDto.disk;
      product.memory = newProductDto.memory;
      product.min_ram = newProductDto.min_ram;
      const category = await this.categoryService.upsert(
        newProductDto.category_name,
      );
      console.log(category);
      const category_id = category[0].id;
      const manufacturer = await this.manufacturerService.upsert(
        newProductDto.manufacturer_name,
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

  //5 пункт
  async compatibilityWithComp(compatibilityDto) {
    try {
      const obj: any = {};
      // const prod: any = {};
      const { name, memory, min_ram } = compatibilityDto;
      for (const el in compatibilityDto) {
        obj[el] = compatibilityDto[el];
      }
      console.log(obj);
      const prod = await this.productRepository.findOne({
        where: {
          name,
        },
        attributes: ['memory', 'min_ram'],
      });
      console.log(prod.memory);
      let msgOk = '';
      let msgMem = '';
      let msgMin = '';
      let msgErr = '';
      let flag = false;
      let flag_2 = false;
      if (obj.memory >= prod.memory) {
        flag = true;
      } else {
        const need_mem = prod.memory - obj.memory;
        msgMem = `Вам не хватает ${need_mem} Мб памяти`;
      }
      if (obj.min_ram >= prod.min_ram) {
        flag_2 = true;
      } else {
        const need_min = prod.min_ram - obj.min_ram;
        msgMin = `Вам не хватает ${need_min} Мб оперативной памяти`;
      }
      if (flag == true && flag_2 == true) {
        msgOk = 'Продукт полностью совместим с вашим компьютером!';
      } else {
        msgErr = 'Продукт не совместим с вашим компьютером!';
      }
      return [msgOk, msgErr, msgMem, msgMin];
    } catch (ex) {
      throw new NotFoundException();
    }
  }
  //6 пункт
  async FindSuitableProduct(suitableDto) {
    try {
      const obj: any = {};
      const { memory, min_ram, cost } = suitableDto;
      for (const el in suitableDto) {
        obj[el] = suitableDto[el];
      }
      // console.log(obj);
      const prod = await this.productRepository.findAll({
        raw: true,
        where: {
          cost: { [Op.lte]: obj.cost },
          memory: { [Op.lte]: obj.memory },
          min_ram: { [Op.lte]: obj.min_ram },
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

      const sortedProd = prod.sort(function (a, b) {
        return a.memory - b.memory || a.cost - b.cost || a.min_ram - b.min_ram;
      });
      // console.log(sortedProd[0]);
      // for (const it of prod) {
      // }
      return sortedProd[0];
    } catch (ex) {
      throw new NotFoundException();
    }
  }
}
