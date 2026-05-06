import { Flight } from './Flight'

/**
 * Represents an airport in the flight network.
 */
export interface Airport {
    /** Unique identifier for the airport. */
    id: string
    /** IATA airport code (e.g. "JFK", "LAX"). */
    code: string
    /** Full name of the airport. */
    name: string
    /** City where the airport is located. */
    city: string
    /** Outbound flights departing from this airport. */
    flights: Flight[]
}
