import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './app/movies/movies.module';
import { MoviesController } from './app/movies/movies.controller';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([]), MoviesModule],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule { }
