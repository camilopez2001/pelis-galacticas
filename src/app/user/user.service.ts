import { Injectable } from '@nestjs/common';
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

    update(user_id: number, password, access_token): Promise<any> {
        return this.userRepository.update(
            { id: user_id },
            { password: password, access_token: access_token },
        );
    }

}
