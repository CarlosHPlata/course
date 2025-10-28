import moment from 'moment'
import { Path } from './SkyScanner/model/Path'

export function printFlightPathArt(path: Path) {
  // Header
  const cost = path.totalCostUSD * 100
  const totalDuration = moment.duration(path.totalDurationMinutes, 'minutes')
  const totalDurationStr = `${totalDuration.days() > 0 ? totalDuration.days().toString() + ' days ' : ''}${totalDuration.hours()}h ${totalDuration.minutes()}m`
  console.log('\n==============================')
  console.log(` DEPARTURE: ${path.departure.city}, ${path.departure.name} (${path.departure.code})`)
  console.log(` ARRIVAL: ${path.arrival.city}, ${path.arrival.name} (${path.arrival.code})`)
  console.log(` DURATION: ${totalDurationStr}   COST: $${cost.toFixed(2)}`)
  console.log('-------------------------------\n')

  // Connections
  let art = ''
  for (let i = 0; i < path.flights.length; i++) {
    const flight = path.flights[i]
    art += `${flight.from.code} `
    if (i < path.flights.length - 1) {
      art += '───✈───> '
    } else {
      art += '───✈───> '
      art += `${flight.to.code}\n`
    }
  }
  console.log(art)

  // Details
  console.log('\nConnections:')
  path.flights.forEach((flight, idx) => {
    const start = moment(flight.startTime).format('YYYY-MM-DD HH:mm')
    const end = moment(flight.endTime).format('YYYY-MM-DD HH:mm')
    const duration = moment.duration(flight.durationMinutes, 'minutes')
    const durationStr = `${duration.hours()}h ${duration.minutes()}m`

    console.log(
      `  [${idx + 1}] ${flight.flightNumber}: ${flight.from.code} --> ${flight.to.code}\n` +
      `      ✈ ${flight.from.city}, ${flight.from.name} (${flight.from.code})\n` +
      `      ✈ ${flight.to.city}, ${flight.to.name} (${flight.to.code})\n` +
      `      Departs: ${start}\n` +
      `      Arrives: ${end}\n` +
      `      Duration: ${durationStr}\n`
    )
  })
  console.log('==============================\n')
}
