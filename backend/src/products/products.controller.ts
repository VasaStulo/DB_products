import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductWithSomeDto } from './dto/get-product-with-some.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NewProductDto } from './dto/new-product-dto';
import { AnalogProductDto } from './dto/analog-product-dto';
import { CompatibilityDto } from './dto/compatibility-dto';
import { SuitableDto } from './dto/suitable-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('find_place')
  findOne(@Body() getProductWithSomeDto: GetProductWithSomeDto) {
    return this.productsService.findOne(getProductWithSomeDto);
  }

  @Post('find_by_feature')
  findByFeature(@Body() findByFeatureDto: NewProductDto) {
    return this.productsService.findByFeature(findByFeatureDto);
  }

  @Post('add_program')
  create(@Body() createProductDto: NewProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('analog_product')
  findAnalog(@Body() analogProductDto: AnalogProductDto) {
    return this.productsService.findAnalog(analogProductDto);
  }

  @Post('compatibility')
  compatibilityWithComp(@Body() compatibilityDto: CompatibilityDto) {
    return this.productsService.compatibilityWithComp(compatibilityDto);
  }

  @Post('suitable_product')
  FindSuitableProduct(@Body() suitableDto: SuitableDto) {
    return this.productsService.FindSuitableProduct(suitableDto);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
