import { Module } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  providers: [RoleService, RoleResolver],
  exports: [RoleService, RoleResolver],
})
export class RoleModule { }
