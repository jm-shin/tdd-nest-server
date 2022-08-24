import { Test, TestingModule } from '@nestjs/testing';
import { mysqlDatabaseProviders } from './mysql-database.providers';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'mysql2';
import { DATA_SOURCE } from './database.constants';

describe('MysqlDatabaseProviders', () => {
  let conn: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [...mysqlDatabaseProviders],
    }).compile();

    conn = module.get<Connection>(DATA_SOURCE);
  });

  it('DATA_SOURCE should be defined', () => {
    expect(conn).toBeDefined();
  });
});
