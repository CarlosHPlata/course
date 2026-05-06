import * as fs from 'fs'
import { Flight } from '../model/Flight'
import { IFlightsSubscriber } from './IFlightSubscriber'
import { FlightStore } from './FlightStore'

/**
 * Subscriber that appends a timestamped log entry to `log.txt` whenever
 * a flight is created or updated in `FlightStore`.
 */
export class FlightLoggerSubscriber implements IFlightsSubscriber {
  constructor () {
    FlightStore.getInstance().subscribe(this)
  }

  /**
   * Writes a log line with the flight details and current timestamp.
   * @param flight - The flight that was created or updated.
   */
  onFlightsUpdated (flight: Flight): void {
    const logEntry = `[${new Date().toISOString()}] Flight Updated: ${flight.id} - ${flight.flightNumber} from ${flight.from.code} to ${flight.to.code} ($${flight.costUSD})\n`
    fs.appendFileSync('log.txt', logEntry)
  }
}
