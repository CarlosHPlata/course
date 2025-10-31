import moment from 'moment'
import { Airport } from './model/Airport'
import { Flight } from './model/Flight'
import { Path } from './model/Path'
import { RoutesProvider } from './interfaces/routesProvider'
import { Inject } from './library/Inject'


interface Options { maxStops: number }
export class PathFinder {
  @Inject("RoutesProvider")
  private readonly routesStore!: RoutesProvider

  search(
    startId: string,
    targetId: string,
    options: Options = { maxStops: 5 }
  ): Path[] {
    const startAirport = this.routesStore.getAirportById(startId)
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

  private isAirportAlreadyVisited(flight: Flight, path: Flight[]) {
    return path.some(f => f.id === flight.to.id)
  }

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

  private calculateeTotalCost(path: Flight[]) {
    const baseCost = path.reduce((sum, flight) => sum + flight.costUSD, 0)
    return (baseCost * this.feeForDirectFlights(path)) / this.feeForShortFlights(path)
  }

  private feeForDirectFlights(path: Flight[]) {
    const FEE_FOR_DIRECT_FLIGHTS = 1.5
    const connections = path.length - 1
    return FEE_FOR_DIRECT_FLIGHTS + Math.exp(-connections)
  }

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

  private getTotalDurationMinutes(flights: Flight[]): number {
    if (flights.length === 0) return 0
    const start = moment(flights[0].startTime)
    const end = moment(flights[flights.length - 1].endTime)
    return end.diff(start, 'minutes', true)
  }
}
