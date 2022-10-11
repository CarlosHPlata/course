import { Point } from '../dtos'
import { GoogleMapsRes } from './google.types'

const SEA_COUNTRY_NAME = 'sea'
const GMAPS_KEY = process.env.GMAPS_KEY
const GMAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

export async function getCountryName({ lat, long }: Point): Promise<string> {
  const url = `${GMAPS_URL}?key=${GMAPS_KEY}&latlng=${lat},${long}&sensor=false`
  const api = await fetch(url)
  const googleRes: GoogleMapsRes = await api.json()

  const success = googleRes.results.find((r) => r.types.includes('country'))

  if (!success) return SEA_COUNTRY_NAME

  return success.address_components[0].short_name
}
