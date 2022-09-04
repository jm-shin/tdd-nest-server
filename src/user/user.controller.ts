import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../database/user.entity';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateUserDto } from './dto/update.user.dto';

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

  @Put(':id')
  putUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<boolean> {
    return from(this.userService.deleteById(id)).pipe();
  }
}
