import { Flight } from '../model/Flight'
import { IFlightsPublisher } from './IFlightPublisher'
import { IFlightsSubscriber } from './IFlightSubscriber'
import crypto from 'crypto'

/**
 * <Builder pattern that gets one instance> store responsible for creating flights and broadcasting updates
 * to all registered subscribers via the <some pattern that publish things to others>.
 */
export class FlightStore implements IFlightsPublisher {
    private readonly subscribers: Set<IFlightsSubscriber>
    private static instance: FlightStore

    private constructor() {
        this.subscribers = new Set<IFlightsSubscriber>()
    }

    /**
     * Returns the single shared instance of `FlightStore`, creating it on first call.
     */
    static getInstance(): FlightStore {
        if (!FlightStore.instance) {
            FlightStore.instance = new FlightStore()
        }
        return FlightStore.instance
    }

    /**
     * Registers a subscriber to receive flight update notifications.
     * @param subscriber - The subscriber to add.
     */
    subscribe(subscriber: IFlightsSubscriber): void {
        this.subscribers.add(subscriber)
    }

    /**
     * Removes a previously registered subscriber.
     * @param subscriber - The subscriber to remove.
     */
    unsubscribe(subscriber: IFlightsSubscriber): void {
        this.subscribers.delete(subscriber)
    }

    /**
     * Notifies all registered subscribers of a flight change.
     * @param flight - The flight that was created or updated.
     */
    notifyFlightUpdated(flight: Flight): void {
        this.subscribers.forEach((subscriber) => {
            subscriber.onFlightsUpdated(flight)
        })
    }

    /**
     * Creates a new flight with a generated UUID, persists it, and notifies subscribers.
     * @param flightData - All flight fields except `id`.
     * @returns The newly created flight including its generated `id`.
     */
    createFlight(flightData: Omit<Flight, 'id'>): Flight {
        const flight: Flight = {
            id: crypto.randomUUID(),
            ...flightData
        }

        this.notifyFlightUpdated(flight)
        return flight
    }
}
