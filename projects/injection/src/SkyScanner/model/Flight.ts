import { Airport } from './Airport'

export interface Flight {
  id: string
  from: Airport
  to: Airport
  durationMinutes: number
  costUSD: number
  startTime: string
  endTime: string
  flightNumber: string
}
