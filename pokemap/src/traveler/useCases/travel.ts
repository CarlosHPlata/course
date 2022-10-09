import { Point, TravelContext, ZoneDto } from '../dtos'
import Zone, { FamiliesInZone } from '../entities/zone'
import { MAX_RANDOM_HIT_VALUE, MIN_RANDOM_HIT_VALUE } from '../utils/constants'
import { getRandomInt } from '../utils/math.utils'
import { Pokemon } from '../../pokemon'
import { GarchompMock } from '../dtos/mock'
import { ZoneFinder } from '../interfaces/ZoneFinder'
import { generateRandomPokemon } from './pokeom'

export default class Traveler {
  constructor(private zoneFinder: ZoneFinder) {}

  public async travelTo(position: Point): Promise<TravelContext> {
    const zone = await this.getZoneByPosition(position)

    let doesEncounterOcurred = zone.isEncounterPossible(
      this.generateRandomHit()
    )
    let encounter: Pokemon | undefined

    if (doesEncounterOcurred) {
      encounter = await this.generateRandomEncounter(zone)
    }

    return {
      zone: { name: zone.name },
      position,
      doesEncounterOcurred,
      encounter,
    }
  }

  private async getZoneByPosition(position: Point): Promise<Zone> {
    const { name, families } = await this.zoneFinder(position)
    const familiesInZone: FamiliesInZone[] = families.map((f) => ({
      family: f.pokemons,
      probability: f.probability,
    }))

    return new Zone(name, familiesInZone)
  }

  private async generateRandomEncounter(zone: Zone): Promise<Pokemon> {
    const pokemonFamily = zone.generateFamilyEncounter(this.generateRandomHit())

    const randomPokemonIndex = this.generateRandomHit(pokemonFamily.length) - 1
    const { id } = pokemonFamily[randomPokemonIndex]

    return generateRandomPokemon(id)
  }

  private generateRandomHit(max = MAX_RANDOM_HIT_VALUE) {
    return getRandomInt(MIN_RANDOM_HIT_VALUE, max)
  }
}
