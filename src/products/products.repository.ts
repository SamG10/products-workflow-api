import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.create(createProductDto);
    return this.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.find();
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    Object.assign(product, updateProductDto);
    return this.save(product);
  }

  async removeProduct(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Product with id ${id} not found`);
  }
}
