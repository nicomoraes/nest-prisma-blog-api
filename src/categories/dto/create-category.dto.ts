import { IsString, IsNotEmpty } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto implements Pick<Category, 'description'> {
  @IsString()
  @IsNotEmpty()
  description: string;
}
