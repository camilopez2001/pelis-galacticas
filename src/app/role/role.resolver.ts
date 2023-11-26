import { Args, Query, Resolver } from '@nestjs/graphql';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [RoleEntity], { name: 'roles' })
  getRoles(): Promise<RoleEntity[]> {
    return this.roleService.getRoles();
  }

  @Query(() => [RoleEntity], { name: 'rol' })
  getRole(@Args('id') id: number): Promise<RoleEntity> {
    return this.roleService.getRole(id);
  }
}
