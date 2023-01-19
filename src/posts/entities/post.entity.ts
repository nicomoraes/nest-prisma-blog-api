import { Category } from './../../categories/entities/category.entity';
import { Post as PostType } from '@prisma/client';

export class Post implements PostType {
  id: string;
  title: string;
  content: string;
  slug: string;
  coverLink: string;
  description: string;
  featured: boolean;
  created_at: Date;
  updatedAt: Date;
  categories?: IntrisicCategory[];
}

type IntrisicCategory = {
  category: Category;
};
