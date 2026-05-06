import { Airport } from './Airport'

/**
 * Represents a single direct flight between two airports.
 */
export interface Flight {
    /** Unique identifier for the flight. */
    id: string
    /** Departure airport. */
    from: Airport
    /** Arrival airport. */
    to: Airport
    /** Scheduled flight duration in minutes. */
    durationMinutes: number
    /** Ticket price in US dollars. */
    costUSD: number
    /** Scheduled departure time (ISO 8601). */
    startTime: string
    /** Scheduled arrival time (ISO 8601). */
    endTime: string
    /** Airline-assigned flight number (e.g. "AA123"). */
    flightNumber: string
}
