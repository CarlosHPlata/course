import { Flight } from './Flight'

export interface Airport {
  id: string
  code: string
  name: string
  city: string
  flights: Flight[]
}
