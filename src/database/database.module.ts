import { Module } from '@nestjs/common';
import { mysqlDatabaseProviders } from './mysql-database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...mysqlDatabaseProviders],
  exports: [...mysqlDatabaseProviders],
})
export class DatabaseModule {}
