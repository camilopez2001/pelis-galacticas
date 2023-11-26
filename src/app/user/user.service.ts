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

    getUser(id: number): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({ where: { id } });
    }
}
