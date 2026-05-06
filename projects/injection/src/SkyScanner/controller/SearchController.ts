import { PathFinder } from "../service/PathFinder"
import { FlightLoggerSubscriber } from "../store/FlightLoggerSubscriber"

/**
 * Entry-point controller that orchestrates flight-path searches and ensures
 * flight activity is logged through `FlightLoggerSubscriber`.
 */
export class SearchController {
    private readonly pathFinder: PathFinder
    private readonly logger: FlightLoggerSubscriber

    constructor() {
        this.pathFinder = new PathFinder()
        this.logger = new FlightLoggerSubscriber()
    }

    /**
     * Finds all valid routes between two airports and returns them sorted by
     * cost-weighted score (cost × 100 + duration), cheapest first.
     * @param departure - ID of the departure airport.
     * @param arrival - ID of the destination airport.
     * @param options - Search constraints (e.g. maximum number of stops).
     * @returns Sorted array of `Path` objects.
     */
    search(departure: string, arrival: string, options: { maxStops: number }) {
        return this.pathFinder.search(departure, arrival, options)
            .sort((a, b) => {
                const costA = a.totalCostUSD * 100 + a.totalDurationMinutes
                const costB = b.totalCostUSD * 100 + b.totalDurationMinutes
                return costA - costB
            })
    }
}