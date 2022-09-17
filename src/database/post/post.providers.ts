import { DATA_SOURCE, POST_REPOSITORY } from '../database.constants';
import { DataSource } from 'typeorm';
import { PostEntity } from './post.entity';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PostEntity),
    inject: [DATA_SOURCE],
  },
];
