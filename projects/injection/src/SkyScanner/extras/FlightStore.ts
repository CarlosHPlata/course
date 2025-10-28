import { Flight } from '../model/Flight'
import { IFlightsPublisher } from './IFlightsPublisher'
import { IFlightsSubscriber } from './IFlightSubscriber'

export class FlightStore implements IFlightsPublisher {
  private readonly subscribers: Set<IFlightsSubscriber>
  private static instance: FlightStore

  private constructor() {
    this.subscribers = new Set<IFlightsSubscriber>()
  }

  static getInstance(): FlightStore {
    if (!FlightStore.instance) {
      FlightStore.instance = new FlightStore()
    }
    return FlightStore.instance
  }

  subscribe(subscriber: IFlightsSubscriber): void {
    this.subscribers.add(subscriber)
  }

  unsubscribe(subscriber: IFlightsSubscriber): void {
    this.subscribers.delete(subscriber)
  }

  notifyFlightUpdated(flight: Flight): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.onFlightsUpdated(flight)
    })
  }

  createFlight(flightData: Omit<Flight, 'id'>): Flight {
    const flight: Flight = {
      id: crypto.randomUUID(),
      ...flightData
    }

    this.notifyFlightUpdated(flight)
    return flight
  }
}
