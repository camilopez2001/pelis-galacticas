import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [UserEntity], { name: 'users' })
    getRoles(): Promise<UserEntity[]> {
      return this.userService.getUsers();
    }
  
    @Query(() => [UserEntity], { name: 'user' })
    getRole(@Args('id') id: number): Promise<UserEntity> {
      return this.userService.getUser(id);
    }
}
