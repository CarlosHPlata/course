import { Point } from '../dtos'
import { ZoneFinder } from '../interfaces/ZoneFinder'
import { getCountryName } from './getCountryName'
import { getZone } from './zoneQueries'

export const zoneFinder: ZoneFinder = async (position: Point) => {
  const country = await getCountryName(position)

  return getZone(country)
}
