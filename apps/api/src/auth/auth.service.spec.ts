import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            toResponse: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jest.clearAllMocks();
  });

  it('should return access_token on valid login', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: 'uuid-1',
      name: 'João Silva',
      email: 'joao@example.com',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuv',
    });
    usersService.toResponse.mockReturnValue({
      id: 'uuid-1',
      name: 'João Silva',
      email: 'joao@example.com',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await authService.login({
      email: 'joao@example.com',
      password: 'senha123',
    });

    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('should throw UnauthorizedException on invalid password', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: 'uuid-1',
      name: 'João Silva',
      email: 'joao@example.com',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuv',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login({
        email: 'joao@example.com',
        password: 'senhaerrada',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when user does not exist', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    await expect(
      authService.login({
        email: 'inexistente@example.com',
        password: 'senha123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
