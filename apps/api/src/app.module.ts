import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

import { Comment } from './posts/entities/comment.entity';
import { Like } from './posts/entities/like.entity';
import { Post } from './posts/entities/post.entity';
import { PostsModule } from './posts/posts.module';
import { UploadsModule } from './uploads/uploads.module';
import { User } from './users/entities/user.entity';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DATABASE_HOST', 'localhost'),

        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),

        username: configService.get<string>('DATABASE_USER', 'codeconnect'),

        password: configService.get<string>(
          'DATABASE_PASSWORD',

          'codeconnect',
        ),

        database: configService.get<string>('DATABASE_NAME', 'codeconnect'),

        entities: [User, Post, Like, Comment],

        migrations: [join(__dirname, 'database/migrations/*{.ts,.js}')],

        migrationsRun:
          configService.get<string>('DATABASE_MIGRATIONS_RUN', 'true') ===
          'true',

        synchronize: false,
      }),
    }),

    UsersModule,

    AuthModule,

    PostsModule,

    UploadsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
