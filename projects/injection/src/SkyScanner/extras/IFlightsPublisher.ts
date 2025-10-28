import { Flight } from '../model/Flight'
import { IFlightsSubscriber } from './IFlightSubscriber'

export interface IFlightsPublisher {
  subscribe: (subscriber: IFlightsSubscriber) => void
  unsubscribe: (subscriber: IFlightsSubscriber) => void
  notifyFlightUpdated: (flight: Flight) => void
}
