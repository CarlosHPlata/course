import { RowDataPacket } from "mysql2";
import { User } from "../../domain/entities/User";
import IUserRepository from "../../domain/interfaces/IUserRepository";
import pool from "../config/database";

export class UserRepository implements IUserRepository {
  async getUserById(userId: string): Promise<User> {
    let connection = await pool.getConnection()
    try {
      let [rows] = await connection.query<RowDataPacket[]>(
        "SELECT id, name, email FROM USERS where id = ?",
        [userId]
      )

      if (rows.length <= 0) {
        throw new Error("No user")
      }

      const firstUser = rows[0]
      return {
        userId: firstUser.id.toString(),
        name: firstUser.name,
        email: firstUser.email
      }
    } catch (error) {
      throw new Error("Error retrieving User")
    } finally {
      connection.release()
    }
  }
}