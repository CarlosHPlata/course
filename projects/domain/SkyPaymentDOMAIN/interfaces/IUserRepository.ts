import { User } from "../entities/User";

export default interface IUserRepository {
  getUserById: (userId: string) => Promise<User>
}