import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from '../database/database.constants';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/post/post.entity';
import { RegisterPostDto } from './dto/register.post.dto';
import { from } from 'rxjs';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: Repository<PostEntity>,
  ) {}

  registerPost(data: RegisterPostDto): any {
    return from(this.postRepository.save(data, { reload: false })).subscribe();
  }
}
