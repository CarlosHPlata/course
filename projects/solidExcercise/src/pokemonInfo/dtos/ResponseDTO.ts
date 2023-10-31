import { PokemonData } from './PokemonData'

export type ResponseDTO = {
  baseInformation: PokemonData
  families: string[]
  countries: string[]
}
