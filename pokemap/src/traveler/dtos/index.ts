import { Pokemon } from '../../pokemon'

export interface ZoneDto {
  id: number
  name: string
  families: any[]
}

export interface Point {
  lat: number
  long: number
}

export interface TravelContext {
  position: Point
  zone: { name: string }
  doesEncounterOcurred: boolean
  encounter?: Pokemon
}

export type PokemonDto = { id: number; name: string }

export type Family = PokemonDto[]
