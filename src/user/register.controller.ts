import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { mergeMap } from 'rxjs';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.user.dto';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}
  @Post()
  registerUser(@Body() registerDto: RegisterUserDto) {
    const id = registerDto.id;
    return this.userService.existsById(id).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`id: ${id} is existed`);
        } else {
          const email = registerDto.email;
          return this.userService.existsByEmail(email).pipe(
            mergeMap((exists) => {
              if (exists) {
                throw new ConflictException(`email: ${email} is existed`);
              } else {
                return this.userService.registerUser(registerDto);
              }
            }),
          );
        }
      }),
    );
  }
}
