import { User } from "../dtos/User";

export interface UserRepository {
    getUserData(userId: number): Promise<User>
}