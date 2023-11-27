import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: { results: [] } })),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });
});
