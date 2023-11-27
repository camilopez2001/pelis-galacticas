import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Observable } from 'rxjs';
import { MovieDto } from './movies.dto';
import { CognitoGroupsGuard } from '../cognito-groups.guard'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  allMovies(): Observable<MovieDto[]> {
    try {
      return this.moviesService.allMovies();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  @UseGuards(CognitoGroupsGuard)
  @SetMetadata('groups', ['REGULAR'])
  oneMovie(@Param('id') movieID: number): Observable<MovieDto> {
    try {
      return this.moviesService.oneMovie(movieID);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post()
  @UseGuards(CognitoGroupsGuard)
  @SetMetadata('groups', ['ADMINISTRADOR'])
  async createMovie(@Body() newMovieData: MovieDto): Promise<Observable<MovieDto>> {
    try {
      console.log('Ingresó');
      return this.moviesService.createMovie(newMovieData);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch(':id')
  @UseGuards(CognitoGroupsGuard)
  @SetMetadata('groups', ['ADMINISTRADOR'])
  async updateMovie(@Param('id') movieID: number, @Body() updatedData: MovieDto): Promise<Observable<MovieDto>> {
    try {
      return this.moviesService.updateMovie(movieID, updatedData);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  @UseGuards(CognitoGroupsGuard)
  @SetMetadata('groups', ['ADMINISTRADOR'])
  async deleteMovie(@Param('id') movieID: number): Promise<Observable<MovieDto>> {
    try {
      return this.moviesService.deleteMovie(movieID);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
