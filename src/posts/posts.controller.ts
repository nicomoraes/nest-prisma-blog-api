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
import { QueryParams } from './interfaces/query-params';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() query: QueryParams) {
    return this.postsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(slug, updatePostDto);
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return this.postsService.remove(slug);
  }
}
