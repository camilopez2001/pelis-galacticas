import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  allMovies() {
    try {
      return this.moviesService.allMovies();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  oneMovie(@Param('id') movieID: number) {
    try {
      return this.moviesService.oneMovie(movieID);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
