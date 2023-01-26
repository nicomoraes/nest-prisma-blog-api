import { Post } from '@prisma/client';

export type PostAndPages = {
  posts: Post[];
  nextPage: number | null;
};
