import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { RegisterController } from './user/register.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController, RegisterController],
  providers: [AppService, UserService],
})
export class AppModule {}
