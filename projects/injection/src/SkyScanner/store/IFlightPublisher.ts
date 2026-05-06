import { Flight } from '../model/Flight'
import { IFlightsSubscriber } from './IFlightSubscriber'

/**
 * Publisher contract for flight update events.
 */
export interface IFlightsPublisher {
    /**
     * Registers a subscriber to receive future flight update notifications.
     * @param subscriber - The subscriber to add.
     */
    subscribe: (subscriber: IFlightsSubscriber) => void
    /**
     * Removes a previously registered subscriber.
     * @param subscriber - The subscriber to remove.
     */
    unsubscribe: (subscriber: IFlightsSubscriber) => void
    /**
     * Broadcasts a flight update to all registered subscribers.
     * @param flight - The flight that was created or modified.
     */
    notifyFlightUpdated: (flight: Flight) => void
}
