import { Pokemon } from '../../../pokemon'

export default interface IPokemonGateway {
  generatePokemon(id: number): Promise<Pokemon>
}
