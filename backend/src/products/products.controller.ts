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
  // @Post('find_place')
  // findOne() {
  //   return this.productsService.findAll();
  // }

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
