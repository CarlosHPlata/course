import { Pokemon } from 'src/pokemon'
import { PokemonDto } from './input.dtos'

export type PositionContext = {
  zone: { name: string }
  encounterOcurred: boolean
  encounter?: Pokemon
}
