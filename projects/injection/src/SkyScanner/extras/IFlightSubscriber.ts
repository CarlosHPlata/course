import { Flight } from '../model/Flight'

export interface IFlightsSubscriber {
  onFlightsUpdated: (flight: Flight) => void
}
