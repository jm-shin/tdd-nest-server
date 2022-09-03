import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../database/user.entity';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Observable<Partial<UserEntity>> {
    return from(this.userService.findById(id)).pipe(
      map((user) => {
        delete user.password;
        return user;
      }),
    );
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<boolean> {
    return from(this.userService.deleteById(id)).pipe();
  }
}
