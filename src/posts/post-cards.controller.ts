import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts/cards')
export class PostsCardsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findByTheLastSixCreated(): Promise<PostEntity[]> {
    return this.postsService.findByTheLastSixCreated();
  }
}
