import { Flight } from "../entities/Flight"

export default interface IFlightRepository {
  getFlightById: (flightId: string) => Promise<Flight>
}