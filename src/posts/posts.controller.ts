import { CreatePostDto } from './dto/create-post.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { IQueryParams } from './interfaces/query-params';
import { PostAndPages } from './interfaces/find-all-posts';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() query: IQueryParams): Promise<PostAndPages> {
    return this.postsService.findAll(query);
  }

  @Get('/get/:slug')
  async findOne(@Param('slug') slug: string): Promise<PostEntity> {
    return this.postsService.findOne(slug);
  }

  @Get('/featured')
  async findByFeatured(): Promise<PostEntity[]> {
    return this.postsService.findByFeatured();
  }

  @Get('/cards')
  async findByTheLastSixCreated(): Promise<PostEntity[]> {
    return this.postsService.findByTheLastSixCreated();
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.update(slug, updatePostDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<PostEntity> {
    return this.postsService.remove(slug);
  }
}
