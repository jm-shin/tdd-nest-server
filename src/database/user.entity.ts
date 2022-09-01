import { Column, Entity, PrimaryColumn } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { RegisterUserDto } from '../user/register.user.dto';

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
}
