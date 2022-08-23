import { Test, TestingModule } from '@nestjs/testing';
import { mysqlDatabaseProviders } from './mysql-database.providers';

describe('MysqlDatabaseProviders', () => {
  let conn: any;
  let dataSource: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...mysqlDatabaseProviders],
    }).compile();
  });
});
