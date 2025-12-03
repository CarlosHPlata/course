import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IUserRepository from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserAggregate } from '../dbentities/UserAggregate';
import { UserMapper } from '../mappers/UserMapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserAggregate)
    private readonly userRepository: Repository<UserAggregate>,
  ) { }

  async getUserById(userId: string): Promise<User> {
    const userAggregate = await this.userRepository.findOne({
      where: { id: parseInt(userId) },
    });

    if (!userAggregate) {
      throw new Error(`User with id ${userId} not found`);
    }

    return UserMapper.toDomain(userAggregate);
  }
}
