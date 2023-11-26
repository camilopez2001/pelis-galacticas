import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './app/movies/movies.module';
import { MoviesController } from './app/movies/movies.controller';
import { RoleModule } from './app/role/role.module';
import { RoleEntity } from './app/role/role.entity';
import { UserEntity } from './app/user/user.entity';
import { UserModule } from './app/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAMEPOSTGRES,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        RoleEntity,
        UserEntity
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forFeature([RoleEntity]),
    MoviesModule,
    RoleModule,
    UserModule
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule { }
