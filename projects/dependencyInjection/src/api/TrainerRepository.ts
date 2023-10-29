import { Pokemon } from './dtos/pokemon.dto'


export interface TrainerRepository {
  capturePokemon: (trainerId: number, wildPokemon: Pokemon) => Promise<Pokemon>
}


