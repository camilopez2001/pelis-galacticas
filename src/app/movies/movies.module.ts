import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CognitoGroupsGuard } from '../cognito-groups.guard'
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [HttpModule, AuthModule],
    providers: [MoviesController, MoviesService, CognitoGroupsGuard],
    exports: [MoviesService, MoviesController],
})
export class MoviesModule { }
