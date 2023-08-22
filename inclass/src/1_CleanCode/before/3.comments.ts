const generateRandomEncounter = () => ({ name: 'pikachu' })
const db = { runQuery: async () => ({ name: 'test', prob: 30 }) }
const myFetch = async () => ({ address_components: [{ short_name: 'test' }] })
type Position = { long: number; lat: number }

const travelTo = async (position: Position, db: any, fetch: any) => {
  // getting the country data from the google api
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=123&latlng=${position.lat},${position.long}&sensor=false`
  const googleRes = await fetch(url)
  const country = googleRes.address_components[0].short_name

  // gathering the zone data by country
  const zone = await db.runQuery(
    `SELECT * FROM zone WHERE zone.country_code = "${country}"`
  )

  // calculate if an encounter could happend if traveling through that zone
  let isEncounterPossible = false
  if (Math.floor(Math.random() * (100 - 1 + 1)) + 1 <= zone.prob) {
    isEncounterPossible = true
  }

  // if encounter happened then generate an encounter
  let encounter
  if (isEncounterPossible) {
    encounter = generateRandomEncounter()
  }

  return {
    zone: { name: zone.name },
    isEncounterPossible,
    encounter,
  }
}

travelTo({ lat: 1, long: 2 }, db, myFetch).then((res) => console.log(res))
