import { User } from '../../domain/entities/User';
import { UserAggregate } from '../dbentities/UserAggregate';

export class UserMapper {
  static toDomain(aggregate: UserAggregate): User {
    return {
      userId: aggregate.id.toString(),
      name: aggregate.name,
      email: aggregate.email,
    };
  }

  static toAggregate(domain: User): UserAggregate {
    const aggregate = new UserAggregate();
    aggregate.id = parseInt(domain.userId);
    aggregate.name = domain.name;
    aggregate.email = domain.email;
    return aggregate;
  }
}
