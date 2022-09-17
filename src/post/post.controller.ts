import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { RegisterPostDto } from './dto/register.post.dto';
import { Observable } from 'rxjs';
import { PostEntity } from '../database/post/post.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() body: RegisterPostDto): Observable<PostEntity> {
    return this.postService.registerPost(body);
  }
}
