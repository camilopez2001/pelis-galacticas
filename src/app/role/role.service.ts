import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    ) {}
    
    getRoles(): Promise<RoleEntity[]> {
      return this.roleRepository.find();
    }

    getRole(id: number): Promise<RoleEntity> {
      return this.roleRepository.findOneOrFail({where: {id}});
    }
}
