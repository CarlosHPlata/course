import { Airport } from './Airport'
import { Flight } from './Flight'

/**
 * Represents a complete travel route composed of one or more connecting flights.
 */
export interface Path {
    /** Origin airport for the journey. */
    departure: Airport
    /** Destination airport for the journey. */
    arrival: Airport
    /** Ordered list of flights that make up the route. */
    flights: Flight[]
    /** Total elapsed time in minutes from first departure to final arrival. */
    totalDurationMinutes: number
    /** Total cost in US dollars after all pricing adjustments. */
    totalCostUSD: number
}
