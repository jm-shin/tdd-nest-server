import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './database.constants';

export const mysqlDatabaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.MYSQL_DB_NAME || 'root',
        password: process.env.MYSQL_DB_PASSWORD || 'root',
        database: process.env.MYSQL_DB || 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];