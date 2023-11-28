import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({ name: 'user' })
@ObjectType('UserEntity')
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ length: 100, type: 'varchar'})
  username: string;

  @Field(() => String)
  @Column({ length: 100, type: 'varchar', nullable: true})
  email: string;

  @Field(() => String)
  @Column({ type: 'varchar' , nullable: true})
  password: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true})
  access_token: string;
  static find: any;
}