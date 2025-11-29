import { RowDataPacket } from "mysql2";
import { Flight } from "../../domain/entities/Flight";
import IFlightRepository from "../../domain/interfaces/IFlightRepository";
import pool from "../config/database";

export class FlightRepository implements IFlightRepository {

  async getFlightById(flightId: string): Promise<Flight> {
    let connection = await pool.getConnection();
    try {
      let [rows] = await connection.query<RowDataPacket[]>(
        "SELECT flightNumber, baseprice, departure, destination, departureDate, arrivalDate FROM Flight WHERE flightNumber = ?",
        [flightId]
      )

      if (rows.length <= 0) {
        throw new Error("No Flight")
      }

      const firstFlight = rows[0];

      console.log(firstFlight)
      const flight = new Flight(firstFlight.flightNumber, firstFlight.baseprice);
      return flight;

    } catch (error) {
      throw new Error("Error retriving Flight");
    } finally {
      connection.release();
    }
  }
}