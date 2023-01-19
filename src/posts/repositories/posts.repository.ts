import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '@prisma/client';
import { transformToDataObject } from 'src/utils/formatter';
import { UpdatePostDto } from '../dto/update-post.dto';
import { QueryParams } from '../interfaces/query-params';

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

  async findAll(query?: QueryParams) {
    return this.prisma.post.findMany({
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
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(slug: string) {
    return this.prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async update(slug: string, { ...updatePostDto }: UpdatePostDto) {
    return this.prisma.post.update({
      where: { slug },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(slug: string) {
    return this.prisma.post.delete({
      where: { slug },
    });
  }
}
