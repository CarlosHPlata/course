import { resetData } from './populateData'
import './src/SkyScanner/RoutesStore'
import { PathFinder } from './src/SkyScanner/PathFinder'
import { printFlightPathArt } from './src/utils'

const pathFinder = new PathFinder()
resetData()

const departure = 'MID'
const arrival = 'ARN'
const results = pathFinder.search(departure, arrival, { maxStops: 5 }).sort((a, b) => {
  const costA = a.totalCostUSD * 100 + a.totalDurationMinutes
  const costB = b.totalCostUSD * 100 + b.totalDurationMinutes
  return costA - costB
})


// ---------------------------------
console.log(`Found ${results.length} flight paths from ${departure} to ${arrival}:\n`)
console.log('Displaying top 5 cheapest paths:\n')
for (const path of results.slice(0, 5)) {
  printFlightPathArt(path)
}

