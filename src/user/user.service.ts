import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../database/database.constants';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user.entity';
import { EMPTY, from, mergeMap, Observable, of } from 'rxjs';
import { map, throwIfEmpty } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ where: { id } })).pipe(
      mergeMap((user) => (user ? of(user) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user:${id} was not found`)),
    );
  }

  existsById(id: string): Observable<boolean> {
    return from(this.userRepository.count({ where: { id } })).pipe(
      map((exists) => !!exists),
    );
  }

  deleteById(id: string): Observable<any> {
    return from(this.userRepository.delete({ id })).pipe(
      map((result) => {
        if (!result.affected)
          throw new NotFoundException('delete id not found');
      }),
    );
  }
}
