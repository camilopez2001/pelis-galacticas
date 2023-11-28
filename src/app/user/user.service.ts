import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    getUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    getUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({ where: { id } });
    }

    getUserByUsername(username: string): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({ where: { username } });
    }

    updatePassword(user_id: number, password: string, access_token: string): Promise<any> {
        return this.userRepository.update(
            { id: user_id },
            { password, access_token },
        );
    }

    createUser(
        username: string,
        ): Promise<UserEntity> {
        return this.userRepository
            .save(
                this.userRepository.create(
                    this.createUserDTO(
                        username,
                        null,
                        null,
                        null
                    ),
                ),
            )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw new InternalServerErrorException(error);
            })
    }

    createUserDTO(
        username: string,
        email: string | null,
        password: string | null,
        access_token: string | null,
    ) {
        return {
            username: username,
            email: email,
            password: password,
            access_token: access_token,
        };
    }

    updateUser(
        id: number,
        email: string | null,
        password: string | null,
        access_token: string | null,
      ): Promise<UserEntity> {
        return this.userRepository
          .findOneOrFail({
            where: { id },
          })
          .then((user) => {
            user.email = email;
            user.password = password;
            user.access_token = access_token;
            return this.userRepository.save(user);
          });
      }

}
