import { Pokemon } from 'src/pokemon'
import Zone, { FamiliesInZone } from '../entities/zone.entity'
import IPokemonGateway from '../interfaces/pokemon.gateway'
import IZoneGateway from '../interfaces/zone.gateway'
import { MAX_RANDOM_HIT_VALUE, MIN_RANDOM_HIT_VALUE } from '../utils/constants'
import { getRandomInt } from '../utils/math.utils'
import { Point } from './portsResponses/input.dtos'
import { PositionContext } from './portsResponses/output.dtos'

export default class TravelerUsecase {
  constructor(
    private zoneGateway: IZoneGateway,
    private pokemonGateway: IPokemonGateway
  ) {}

  public async travelTo(position: Point): Promise<PositionContext> {
    const zone: Zone = await this.getZoneByPosition(position)

    const encounterOcurred = zone.isEncounterPossible(this.generateRandomHit())
    let encounter: Pokemon | undefined
    if (encounterOcurred) {
      encounter = await this.generateRandomEncounter(zone)
    }

    return {
      zone: { name: zone.name },
      encounterOcurred,
      encounter,
    }
  }

  public async getZoneByPosition(position: Point): Promise<Zone> {
    const { name, families } = await this.zoneGateway.getZoneByPosition(
      position
    )
    const familiesInZone: FamiliesInZone[] = families.map((f) => ({
      family: f.pokemons,
      probability: f.probability,
    }))

    return new Zone(name, familiesInZone)
  }

  private async generateRandomEncounter(zone: Zone): Promise<Pokemon> {
    const pokemonFamily = zone.generateEncounter(this.generateRandomHit())

    const randomPokemonIndex = this.generateRandomHit(pokemonFamily.length) - 1
    const { id } = pokemonFamily[randomPokemonIndex]

    return await this.pokemonGateway.generatePokemon(id)
  }

  private generateRandomHit(max = MAX_RANDOM_HIT_VALUE) {
    return getRandomInt(MIN_RANDOM_HIT_VALUE, max)
  }
}
