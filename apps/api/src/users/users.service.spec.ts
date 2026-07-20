import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  const mockUser: User = {
    id: 'uuid-1',
    name: 'João Silva',
    email: 'joao@example.com',
    passwordHash: 'hashed-password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(mockUser);
    repository.save.mockResolvedValue(mockUser);

    const user = await service.create({
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'senha123',
    });

    expect(user.id).toEqual(expect.any(String) as string);
    expect(user).toMatchObject({
      name: 'João Silva',
      email: 'joao@example.com',
    });
    expect(user).not.toHaveProperty('password');
    expect(user).not.toHaveProperty('passwordHash');
    expect(repository.create.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        name: 'João Silva',
        email: 'joao@example.com',
      }),
    );
  });

  it('should normalize email on create', async () => {
    const normalizedUser = { ...mockUser, email: 'maria@example.com' };

    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(normalizedUser);
    repository.save.mockResolvedValue(normalizedUser);

    const user = await service.create({
      name: 'Maria',
      email: '  MARIA@Example.COM  ',
      password: 'senha123',
    });

    expect(user.email).toBe('maria@example.com');
    expect(repository.create.mock.calls[0][0]).toEqual(
      expect.objectContaining({ email: 'maria@example.com' }),
    );
  });

  it('should throw ConflictException when email already exists', async () => {
    repository.findOne.mockResolvedValue(mockUser);

    await expect(
      service.create({
        name: 'Outro João',
        email: 'joao@example.com',
        password: 'outrasenha',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should find user by id', async () => {
    repository.findOne.mockResolvedValue(mockUser);

    const found = await service.findById('uuid-1');

    expect(found).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
  });
});
