import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user.entity';
import { USER_REPOSITORY } from '../database/database.constants';
import { lastValueFrom } from 'rxjs';
import { NotFoundException } from "@nestjs/common";

const mockUserRepository = {
  findOne: jest.fn(),
  count: jest.fn(),
  delete: jest.fn(),
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

  describe('existsById', () => {
    it('should not exist return false', async () => {
      jest.spyOn(userRepository, 'count').mockResolvedValueOnce(0);
      const exists = await lastValueFrom(service.existsById('not_exist_user'));
      expect(exists).toEqual(false);
    });
    it('should exist return true', async () => {
      jest.spyOn(userRepository, 'count').mockResolvedValue(1);
      const notExists = await lastValueFrom(service.existsById('exist_user'));
      expect(notExists).toEqual(true);
    });
  });

  describe('deleteById', () => {
    it('should delete success', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: 0,
      });
      const result = await lastValueFrom(service.deleteById('user01'));
      expect(result).toEqual(undefined);
    });

    it('should delete fail', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({
        affected: 0,
        raw: 0,
      });
      await expect(
        lastValueFrom(service.deleteById('user01')),
      ).rejects.toThrowError(new NotFoundException('delete id not found'));
    });
  });
});
