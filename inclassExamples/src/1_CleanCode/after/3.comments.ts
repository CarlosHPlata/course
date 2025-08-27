const generateRandomEncounter = () => ({ name: 'pikachu' })
const db = { runQuery: async () => ({ name: 'test', prob: 30 }) }
const myFetch = async () => ({ address_components: [{ short_name: 'test' }] })
type Position = { long: number; lat: number }

const getLocationData = async (position: Position) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=123&latlng=${position.lat},${position.long}&sensor=false`
  const googleRes = await fetch(url)
  const country = googleRes.address_components[0].short_name

  return country
}

const getZoneByCountry = async (country) => {
  return await db.runQuery(
    `SELECT * FROM zone WHERE zone.country_code = "${country}"`
  )
}

const isEncounterPossible = (zone) =>
  Math.floor(Math.random() * (100 - 1 + 1)) + 1 <= zone.prob

const travelTo = async (position: Position, db: any, fetch: any) => {
  const country = await getLocationData(position)
  const zone = await getZoneByCountry(country)

  let encounter
  if (isEncounterPossible(zone)) {
    encounter = generateRandomEncounter()
  }

  return {
    zone: { name: zone.name },
    isEncounterPossible,
    encounter,
  }
}

travelTo({ lat: 1, long: 2 }, db, myFetch).then((res) => console.log(res))
