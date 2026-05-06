import moment from 'moment'
import { Airport } from '../model/Airport'
import { Flight } from '../model/Flight'
import { Path } from '../model/Path'
import { IAirportsClient } from '../interfaces/IAirportsClient'


interface Options { maxStops: number }

/**
 * Pathfinder -> RoutesStore (antes)
 * Pathfinder -> interfaz <- RoutesStore (despues)
 * Service that finds all valid flight paths between two airports
 * respecting layover constraints and stop limits using magic algorithm that go deep in recursion 
 */
export class PathFinder {
    // private static IAirportsClient routesStore
    private readonly routesStore: IAirportsClient //<<---------

    constructor(routesStore: IAirportsClient) {
        this.routesStore = routesStore
    }

    /**
     * Returns all valid routes from `startId` to `targetId`.
     * @param startId - ID of the departure airport.
     * @param targetId - ID of the destination airport.
     * @param options - Search constraints; defaults to a maximum of 5 stops.
     * @returns Array of enriched `Path` objects, or an empty array if the
     *          departure airport is not found or no routes exist.
     */
    search(
        startId: string,
        targetId: string,
        options: Options = { maxStops: 5 }
    ): Path[] {
        const startAirport = this.routesStore.getAirportById(startId) //<----------
        if (!startAirport) return []

        const paths: Flight[][] = []
        this.doSearch(
            [startAirport, []],
            targetId,
            options.maxStops + 1,
            paths
        )

        return paths.map(path => this.enrichPathData(path))
    }

    /**
     * Recursive <magic algorithm that go deep in > that accumulates valid flight sequences into `paths`.
     * @param currents - Tuple of the current airport and flights taken so far.
     * @param targetId - ID of the destination airport.
     * @param stops - Remaining stops budget; search aborts when it reaches 0.
     * @param paths - Collector for complete flight sequences.
     */
    private doSearch(currents: [Airport, Flight[]], targetId: string, stops: number, paths: Flight[][]) {
        const [current, path] = currents

        if (stops <= 0) return
        if (current.id === targetId) {
            paths.push([...path])
            return
        }

        for (const flight of current.flights) {
            if (this.isAirportAlreadyVisited(flight, path)) {
                continue
            }

            if (!this.isNextFlightValid(flight, path)) {
                continue
            }

            this.doSearch(
                [flight.to, [...path, flight]],
                targetId,
                stops - 1,
                paths
            )
        }
    }

    /**
     * Returns `true` if the destination of `flight` was already visited in `path`,
     * preventing cycles.
     */
    private isAirportAlreadyVisited(flight: Flight, path: Flight[]) {
        return path.some(f => f.id === flight.to.id)
    }

    /**
     * Validates timing constraints for the next flight:
     * it must depart after the last arrival and within a 48-hour layover window.
     * @param flight - Candidate next flight.
     * @param path - Flights already committed to the current route.
     */
    private isNextFlightValid(flight: Flight, path: Flight[]) {
        const MAX_LAYOVER_HOURS = 48
        const lastFlight = path.length > 0 ? path[path.length - 1] : null
        const lastFlightArrivalTime = lastFlight?.endTime ?? null

        if (lastFlightArrivalTime) {
            const nextStart = moment(flight.startTime)
            const lastEnd = moment(lastFlightArrivalTime)

            if (nextStart.isSameOrBefore(lastEnd)) return false
            if (nextStart.diff(lastEnd, 'hours') > MAX_LAYOVER_HOURS) return false
        }

        return true
    }

    /**
     * Builds a `Path` object from a raw flight sequence, computing aggregate fields.
     * @param path - Ordered list of flights forming a complete route.
     */
    private enrichPathData(path: Flight[]): Path {
        const totalCostUSD = this.calculateeTotalCost(path)
        const departure = path[0].from
        const arrival = path[path.length - 1].to
        const totalDurationMinutes = this.getTotalDurationMinutes(path)

        return {
            departure,
            arrival,
            flights: path,
            totalDurationMinutes,
            totalCostUSD
        }
    }

    /**
     * Calculates the total adjusted cost for a route by applying direct-flight
     * and short-flight pricing factors.
     * @param path - Flights in the route.
     */
    private calculateeTotalCost(path: Flight[]) {
        const baseCost = path.reduce((sum, flight) => sum + flight.costUSD, 0)
        return (baseCost * this.feeForDirectFlights(path)) / this.feeForShortFlights(path)
    }

    /**
     * Returns a pricing multiplier that rewards routes with more connections;
     * direct flights carry a higher base fee.
     * @param path - Flights in the route.
     */
    private feeForDirectFlights(path: Flight[]) {
        const FEE_FOR_DIRECT_FLIGHTS = 1.5
        const connections = path.length - 1
        return FEE_FOR_DIRECT_FLIGHTS + Math.exp(-connections)
    }

    /**
     * Returns a pricing divisor that discounts short itineraries; routes under
     * 4 hours receive a fixed discount, longer routes scale up gradually.
     * @param path - Flights in the route.
     */
    private feeForShortFlights(path: Flight[]) {
        const FEE_FOR_SHORT_FLIGHTS = 0.15;
        const MIN_FLIGHT_DURATION_HOURS = 4;
        const totalMinutes = this.getTotalDurationMinutes(path)
        const totalHours = totalMinutes / 60

        if (totalHours < MIN_FLIGHT_DURATION_HOURS) {
            return FEE_FOR_SHORT_FLIGHTS
        }

        return Math.max(FEE_FOR_SHORT_FLIGHTS, (totalHours - MIN_FLIGHT_DURATION_HOURS) * 0.01)
    }

    /**
     * Computes elapsed minutes from the first departure to the last arrival.
     * @param flights - Ordered flight sequence.
     * @returns Total minutes, or 0 for an empty sequence.
     */
    private getTotalDurationMinutes(flights: Flight[]): number {
        if (flights.length === 0) return 0
        const start = moment(flights[0].startTime)
        const end = moment(flights[flights.length - 1].endTime)
        return end.diff(start, 'minutes', true)
    }
}
