import { Category as CategoryType } from '@prisma/client';

export class Category implements CategoryType {
  id: number;
  description: string;
}
