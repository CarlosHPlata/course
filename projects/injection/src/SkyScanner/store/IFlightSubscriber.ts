import { Flight } from '../model/Flight'

/**
 * Subscriber contract for flight update events.
 */
export interface IFlightsSubscriber {
    /**
     * Called by the publisher whenever a flight is created or updated.
     * @param flight - The flight that triggered the notification.
     */
    onFlightsUpdated: (flight: Flight) => void


     //<------ no estaba antes
}
