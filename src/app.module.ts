import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, PostModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
