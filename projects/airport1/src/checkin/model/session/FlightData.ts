import { CountryCode } from '../Schema'

export interface FlightData {
  flightNumber: string
  price: number
  from: Airport
  to: Airport
}

export interface Airport {
  name: string
  country: CountryCode
}
