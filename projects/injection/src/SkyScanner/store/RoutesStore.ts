import { IAirportsClient } from '../interfaces/IAirportsClient'
import { Airport } from '../model/Airport'
import { Flight } from '../model/Flight'
import { FlightStore } from './FlightStore'
import { IFlightsSubscriber } from './IFlightSubscriber'

/**
 * In-memory route using <data structure that uses nodes and relationships> that keeps airport and flight data in sync with
 * `FlightStore` by subscribing to its update notifications.
 */
export class RoutesStore implements IFlightsSubscriber, IAirportsClient {
    private readonly airports: Map<string, Airport>

    constructor() {
        this.airports = new Map()
        FlightStore.getInstance().subscribe(this)
    }

    /**
     * Looks up an airport by its unique identifier.
     * @param id - The airport ID to search for.
     * @returns The matching `Airport`, or `null` if not found.
     */
    getAirportById(id: string): Airport | null {
        return this.airports.get(id) ?? null
    }

    /**
     * Handles a flight update from `FlightStore`: registers any new airports
     * and upserts the flight into the departure airport's flight list.
     * @param flight - The flight that was created or updated.
     */
    onFlightsUpdated(flight: Flight): void {
        this.setAirportsIfAbsent([flight.from, flight.to])

        const fromAirport = this.airports.get(flight.from.id)
        const existingFlight = fromAirport?.flights.find(f => f.id === flight.id)
        if (existingFlight) {
            Object.assign(existingFlight, flight)
        } else {
            fromAirport?.flights.push(flight)
        }
    }

    /**
     * Adds each airport to the internal map only if it is not already present.
     * @param airports - Airports to register if absent.
     */
    private setAirportsIfAbsent(airports: Airport[]): void {
        airports.forEach(airport => {
            if (!this.airports.has(airport.id)) {
                this.airports.set(airport.id, airport)
            }
        })
    }
}
