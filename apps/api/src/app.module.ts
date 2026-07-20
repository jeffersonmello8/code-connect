import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

import { User } from './users/entities/user.entity';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DATABASE_HOST', 'localhost'),

        port: parseInt(
          configService.get<string>('DATABASE_PORT', '5432'),
          10,
        ),

        username: configService.get<string>('DATABASE_USER', 'codeconnect'),

        password: configService.get<string>(
          'DATABASE_PASSWORD',

          'codeconnect',
        ),

        database: configService.get<string>('DATABASE_NAME', 'codeconnect'),

        entities: [User],

        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),

    UsersModule,

    AuthModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
