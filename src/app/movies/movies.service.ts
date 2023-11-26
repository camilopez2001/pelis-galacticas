import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';

@Injectable()
export class MoviesService {
  private url = 'https://swapi.dev/api/films/';
  constructor(private readonly httpService: HttpService) { }

  allMovies() {
    return this.httpService.get(this.url).pipe(
      map((response) => response.data.results),
      catchError((error: AxiosError) => {
        console.error('An error happened during the request:', error.message);
        throw 'An error happened!';
      }),
    );
  }

  oneMovie(movieID: number) {
    console.log(`${this.url}${movieID}`);
    return this.httpService.get(`${this.url}${movieID}`).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('An error happened during the request:', error.message);
        throw 'An error happened!';
      }),
    );
  }

  createMovie(newMovieData: any) {
    return this.httpService.post(this.url, newMovieData).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('An error happened during the request:', error.message);
        throw 'An error happened!';
      }),
    );
  }

  updateMovie(movieID: number, updatedData: any) {
    return this.httpService.patch(`${this.url}${movieID}`, updatedData).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('An error happened during the request:', error.message);
        throw 'An error happened!';
      }),
    );
  }

  deleteMovie(movieID: number) {
    return this.httpService.delete(`${this.url}${movieID}`).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('An error happened during the request:', error.message);
        throw 'An error happened!';
      }),
    );
  }
}
