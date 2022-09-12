import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { userProviders } from '../database/user/user.providers';
import { RegisterController } from './register.controller';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [RegisterController, UserController],
})
export class UserModule {}