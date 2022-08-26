import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user.entity';
import { USER_REPOSITORY } from '../database/database.constants';
import { lastValueFrom } from 'rxjs';

const mockUserRepository = {
  findOne: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined userRepository', async () => {
    expect(userRepository).toBeDefined();
  });

  describe('findById', () => {
    it('should return one result', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 'user01',
        password: '#####',
        username: 'jm',
        department: 'dev',
        email: 'user01@example.com',
      });

      const foundUser = await lastValueFrom(service.findById('user01'));

      expect(foundUser).toEqual({
        id: 'user01',
        password: '#####',
        username: 'jm',
        department: 'dev',
        email: 'user01@example.com',
      });
      expect(userRepository.findOne).lastCalledWith({
        where: { id: 'user01' },
      });
      expect(userRepository.findOne).toBeCalledTimes(1);
    });
  });
});
