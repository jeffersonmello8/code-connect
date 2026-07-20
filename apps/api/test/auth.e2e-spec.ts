import { randomUUID } from 'crypto';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
}

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should register, login and return current user', async () => {
    const uniqueEmail = `joao-${randomUUID()}@example.com`;
    const userPayload = {
      name: 'João Silva',
      email: uniqueEmail,
      password: 'senha123',
    };

    const registerResponse = await request(app.getHttpServer())
      .post('/users')
      .send(userPayload)
      .expect(201);

    const registerBody = registerResponse.body as UserResponse;

    expect(registerBody.id).toEqual(expect.any(String) as string);
    expect(registerBody).toMatchObject({
      name: userPayload.name,
      email: userPayload.email,
    });
    expect(registerBody).not.toHaveProperty('password');

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: userPayload.email,
        password: userPayload.password,
      })
      .expect(200);

    const loginBody = loginResponse.body as LoginResponse;

    expect(loginBody.access_token).toEqual(expect.any(String) as string);

    const meResponse = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${loginBody.access_token}`)
      .expect(200);

    const meBody = meResponse.body as UserResponse;

    expect(meBody).toEqual({
      id: registerBody.id,
      name: userPayload.name,
      email: userPayload.email,
    });
  });

  it('should return 401 when accessing /auth/me without token', () => {
    return request(app.getHttpServer()).get('/auth/me').expect(401);
  });

  it('should return 409 when registering duplicate email', async () => {
    const uniqueEmail = `joao-${randomUUID()}@example.com`;
    const userPayload = {
      name: 'João Silva',
      email: uniqueEmail,
      password: 'senha123',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(userPayload)
      .expect(201);

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Outro João',
        email: userPayload.email,
        password: 'outrasenha',
      })
      .expect(409);
  });
});
