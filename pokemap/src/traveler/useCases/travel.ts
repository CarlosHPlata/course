import { GoogleMapsRes } from '../infrastructure/google.types'
import * as DB from '../../db'
import { Point, TravelContext, ZoneDto } from '../dtos'
import Zone, { FamiliesInZone } from '../entities/zone'
import { MAX_RANDOM_HIT_VALUE, MIN_RANDOM_HIT_VALUE } from '../utils/constants'
import { getRandomInt } from '../utils/math.utils'
import { Pokemon } from '../../pokemon'
import { GarchompMock } from '../dtos/mock'

export default class Traveler {
  private SEA_COUNTRY_NAME = 'sea'
  private GMAPS_KEY = process.env.GMAPS_KEY
  private GMAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
  private COUNTRY_UNKNOWN = 'unknown'

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

  private async zoneFinder(position: Point): Promise<ZoneDto> {
    const country = await this.getCountryName(position)
    let zone = await this.getZoneWithoutFamilies(country)
    zone = await this.fillFamilies(zone)

    return zone
  }

  private async getCountryName({ lat, long }: Point): Promise<string> {
    const url = `${this.GMAPS_URL}?key=${this.GMAPS_KEY}&latlng=${lat},${long}&sensor=false`
    const api = await fetch(url)
    const googleRes: GoogleMapsRes = await api.json()

    const success = googleRes.results.find((r) => r.types.includes('country'))

    if (!success) return this.SEA_COUNTRY_NAME

    return success.address_components[0].short_name
  }

  private async getZoneWithoutFamilies(country: string): Promise<ZoneDto> {
    const COUNTRY_QUERY = `
      SELECT * FROM zone WHERE zone.country_code = "${country}"
    `
    const res = await DB.runQuery(COUNTRY_QUERY)
    if (res.results.length === 0) {
      if (country !== this.COUNTRY_UNKNOWN)
        return this.getZoneWithoutFamilies(this.COUNTRY_UNKNOWN)
      else throw new Error('country not in DB')
    }

    return {
      id: res.results[0].id,
      name: res.results[0].country_code,
      families: [],
    }
  }

  private async fillFamilies(zone: ZoneDto): Promise<ZoneDto> {
    const query = `
      select family.name as familyName, family_zone.probability as probability, pokemon.id as id, pokemon.name as name from family_zone
      left join family on family_zone.family_id = family.id
      left join family_pokemon on family_pokemon.family_id = family.id
      left join pokemon on family_pokemon.pokemon_id = pokemon.id
      where family_zone.zone_id = ${zone.id};
    `
    const res = await DB.runQuery(query)

    if (res.results.length === 0) throw new Error('zone with no pokemons')

    const famMap: Record<string, any> = {}
    res.results.forEach((rowData) => {
      if (!famMap[rowData.familyName]) {
        famMap[rowData.familyName] = {
          probability: rowData.probability,
          pokemons: [],
        }
      }

      famMap[rowData.familyName].pokemons.push({
        id: rowData.id,
        name: rowData.name,
      })
    })

    const families = Object.entries(famMap).map((fam) => {
      const [, famArr] = fam
      return famArr
    })

    return { ...zone, families }
  }

  //do it later
  private async generateRandomEncounter(zone: Zone): Promise<Pokemon> {
    return GarchompMock
  }

  private generateRandomHit(max = MAX_RANDOM_HIT_VALUE) {
    return getRandomInt(MIN_RANDOM_HIT_VALUE, max)
  }
}
