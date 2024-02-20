import { FlightData } from './FlightData'

export interface SessionData {
  flights: FlightData[]
  agreementSigned?: boolean
}
