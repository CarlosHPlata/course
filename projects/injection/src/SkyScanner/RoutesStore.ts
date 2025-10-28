import { FlightStore } from './extras/FlightStore'
import { IFlightsSubscriber } from './extras/IFlightSubscriber'
import { Airport } from './model/Airport'
import { Flight } from './model/Flight'

export class RoutesStore implements IFlightsSubscriber {
  private readonly airports: Map<string, Airport>

  constructor() {
    this.airports = new Map()
    FlightStore.getInstance().subscribe(this)
  }

  getAirportById(id: string): Airport | null {
    return this.airports.get(id) ?? null
  }

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

  private setAirportsIfAbsent(airports: Airport[]): void {
    airports.forEach(airport => {
      if (!this.airports.has(airport.id)) {
        this.airports.set(airport.id, airport)
      }
    })
  }
}
