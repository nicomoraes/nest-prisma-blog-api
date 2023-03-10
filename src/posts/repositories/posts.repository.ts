import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '@prisma/client';
import { transformToDataObject } from 'src/utils/formatter';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IQueryParams } from '../interfaces/query-params';
import { PostAndPages } from '../interfaces/find-all-posts';
import { includePostCategories } from 'src/utils/filters';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    categories,
    featured,
    ...rest
  }: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...rest,
        featured: featured ?? false,
        categories: {
          create: categories.map(transformToDataObject),
        },
      },
    });
  }

  async findAll(query?: IQueryParams): Promise<PostAndPages> {
    const QUANTITY_TO_TAKE = 4;
    const page = query.page ? +query.page : 0;

    const postsData = await this.prisma.post.findMany({
      where: {
        title: {
          contains: query?.title,
          mode: 'insensitive',
        },
        categories: {
          some: {
            category: {
              description: query?.category,
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: QUANTITY_TO_TAKE,
      skip: page * 4,
    });

    return {
      posts: postsData,
      nextPage:
        postsData.length === 0 || postsData.length < QUANTITY_TO_TAKE
          ? null
          : page + 1,
    };
  }

  async findOne(slug: string): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        slug,
      },
      include: includePostCategories,
    });
  }

  async findByFeatured(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        featured: true,
      },
      include: includePostCategories,
    });
  }

  async findByTheLastSixCreated(): Promise<Post[]> {
    return this.prisma.post.findMany({
      orderBy: { created_at: 'desc' },
      take: 6,
      include: includePostCategories,
    });
  }

  async update(
    slug: string,
    { ...updatePostDto }: UpdatePostDto,
  ): Promise<Post> {
    return this.prisma.post.update({
      where: { slug },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(slug: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { slug },
    });
  }
}
