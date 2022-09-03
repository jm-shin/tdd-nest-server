import { Column, Entity, PrimaryColumn } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { RegisterUserDto } from '../user/dto/register.user.dto';
import { UpdateUserDto } from "../user/dto/update.user.dto";

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  department: string;

  static async create(data: RegisterUserDto) {
    const user = new UserEntity();
    user.id = data.id;
    user.password = await hash(data.password, 12);
    user.username = data.username;
    user.email = data.email;
    return user;
  }

  static async update(data: UpdateUserDto) {
    const user = new UserEntity();
    user.username = data.username;
    user.email = data.email;
    return user;
  }
}
