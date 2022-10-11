import { ZoneDto } from '../dtos'
import * as DB from '../../db'

const COUNTRY_UNKNOWN = 'unknown'

export async function getZone(country: string): Promise<ZoneDto> {
  let zone = await getZoneWithoutFamilies(country)
  return fillFamilies(zone)
}

async function getZoneWithoutFamilies(country: string): Promise<ZoneDto> {
  const COUNTRY_QUERY = `
    SELECT * FROM zone WHERE zone.country_code = "${country}"
  `
  const res = await DB.runQuery(COUNTRY_QUERY)
  if (res.results.length === 0) {
    if (country !== COUNTRY_UNKNOWN)
      return getZoneWithoutFamilies(COUNTRY_UNKNOWN)
    else throw new Error('country not in DB')
  }

  return {
    id: res.results[0].id,
    name: res.results[0].country_code,
    families: [],
  }
}

async function fillFamilies(zone: ZoneDto): Promise<ZoneDto> {
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
