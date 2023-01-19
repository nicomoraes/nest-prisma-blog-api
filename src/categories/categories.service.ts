import { Category } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.repository.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<Category> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.repository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<Category> {
    return this.repository.remove(id);
  }
}
