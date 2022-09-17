import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  DATA_SOURCE,
  POST_REPOSITORY,
  USER_REPOSITORY,
} from '../database.constants';
import { PostEntity } from '../post/post.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
];