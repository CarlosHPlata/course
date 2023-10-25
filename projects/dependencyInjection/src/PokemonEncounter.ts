import { Pokemon } from './dtos/pokemon.dto'

export default class PokemonEncounter {
  public static CAPTURE_PROBABILITY = 30

  constructor(
    private readonly data: Pokemon
  ) { }

  public canCaptureIt(randomHit: number): boolean {
    return randomHit <= PokemonEncounter.CAPTURE_PROBABILITY && randomHit > 0
  }

  get pokemon() {
    return this.data
  }
}
