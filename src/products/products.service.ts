import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAllProducts();
  }

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findProductById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsRepository.updateProduct(id, updateProductDto);
  }

  remove(id: string): Promise<void> {
    return this.productsRepository.removeProduct(id);
  }
}
