import { PostRepository } from './repositories/posts.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { specialCharacterReplacer } from 'src/utils/formatter';
import { Post as PostEntity } from './entities/post.entity';
import { QueryParams } from './interfaces/query-params';
@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { ...rest } = createPostDto;
    const slug = specialCharacterReplacer(rest.title.toLowerCase());

    const data: CreatePostDto = {
      slug,
      ...rest,
    };

    const post = this.postRepository.create(data);

    return post;
  }

  async findAll(query?: QueryParams): Promise<PostEntity[]> {
    return this.postRepository.findAll(query);
  }

  async findOne(slug: string): Promise<PostEntity> {
    return this.postRepository.findOne(slug);
  }

  async findByFeatured(): Promise<PostEntity[]> {
    return this.postRepository.findByFeatured();
  }

  async findByTheLastSixCreated(): Promise<PostEntity[]> {
    return this.postRepository.findByTheLastSixCreated();
  }

  async update(
    slug: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postRepository.update(slug, updatePostDto);
  }

  async remove(slug: string): Promise<PostEntity> {
    return this.postRepository.remove(slug);
  }
}
