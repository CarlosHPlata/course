import { Pokemon } from '../../pokemon'

export type BuildPokemons = (userId: number) => Promise<Pokemon[]>
