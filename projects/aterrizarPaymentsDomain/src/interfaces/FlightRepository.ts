import { Flight } from "../entities/Flight";

export interface FlightRepository {
    getFlightData(flightNumber: number): Promise<Flight>
}