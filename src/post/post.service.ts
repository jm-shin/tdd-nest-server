import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { POST_REPOSITORY } from '../database/database.constants';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/post/post.entity';
import { RegisterPostDto } from './dto/register.post.dto';
import { EMPTY, from, mergeMap, Observable, of } from 'rxjs';
import { map, throwIfEmpty } from "rxjs/operators";

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: Repository<PostEntity>,
  ) {}

  registerPost(data: RegisterPostDto): any {
    return from(this.postRepository.save(data, { reload: false })).subscribe();
  }

  findByIdx(idx: number): Observable<PostEntity> {
    return from(this.postRepository.findOne({ where: { idx } })).pipe(
      mergeMap(p => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`post: ${idx} was not found`)),
    );
  }

  updateOneById(idx: number, body: Partial<RegisterPostDto>): any {
    return from(this.postRepository.update(idx, { ...body })).pipe(
      map((result) => !!result.affected),
    );
  }
  // isAffected(count: number) {
  //   return !!count
  // }
}
