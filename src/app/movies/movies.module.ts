import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [HttpModule],
    providers: [MoviesController, MoviesService],
    exports: [MoviesService, MoviesController],
})
export class MoviesModule { }
