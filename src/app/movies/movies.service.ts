import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { MovieDto } from './movies.dto'

@Injectable()
export class MoviesService {
  private url = 'https://swapi.dev/api/films/';
  constructor(private readonly httpService: HttpService) { }

  allMovies(): Observable<MovieDto[]> {
    return this.httpService.get(this.url).pipe(
      map((response) => response.data.results as MovieDto[]),
      catchError((error: AxiosError) => {
        throw 'Ocurrió un error:' + error;
      }),
    );
  }

  oneMovie(movieID: number): Observable<MovieDto> {
    return this.httpService.get(`${this.url}${movieID}`).pipe(
      map((response) => response.data as MovieDto),
      catchError((error: AxiosError) => {
        throw 'Ocurrió un error:' + error;
      }),
    );
  }

  createMovie(newMovieData: MovieDto): Observable<MovieDto> {
    return this.httpService.post(this.url, newMovieData).pipe(
      map((response) => response.data as MovieDto),
      catchError((error: AxiosError) => {
        throw 'Ocurrió un error:' + error;
      }),
    );
  }

  updateMovie(movieID: number, updatedData: MovieDto): Observable<MovieDto> {
    return this.httpService.patch(`${this.url}${movieID}`, updatedData).pipe(
      map((response) => response.data as MovieDto),
      catchError((error: AxiosError) => {
        throw 'Ocurrió un error:' + error;
      }),
    );
  }

  deleteMovie(movieID: number): Observable<MovieDto> {
    return this.httpService.delete(`${this.url}${movieID}`).pipe(
      map((response) => response.data as MovieDto),
      catchError((error: AxiosError) => {
        throw 'Ocurrió un error:' + error;
      }),
    );
  }
}
