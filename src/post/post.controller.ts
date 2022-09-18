import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get(':idx')
  getOneUser(@Param('idx', ParseIntPipe) idx: number): Observable<PostEntity> {
    return this.postService.findByIdx(idx);
  }

  @Put(':idx')
  updateOneUser(
    @Param('idx', ParseIntPipe) idx: number,
    @Body() body: Partial<RegisterPostDto>,
  ): Observable<PostEntity> {
    return this.postService.updateOneById(idx, body);
  }
}
