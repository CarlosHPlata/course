import { Airport } from './Airport'
import { Flight } from './Flight'

export interface Path {
  departure: Airport
  arrival: Airport
  flights: Flight[]
  totalDurationMinutes: number
  totalCostUSD: number
}
