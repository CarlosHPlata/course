import { resetData } from "./populate"
import { printFlightPathArt } from "./utils"
import { SearchController } from "./SkyScanner/controller/SearchController"

const controller = new SearchController()
resetData()

const departure = "MID"
const arrival = "ARN"



//----------------
/*
* Imagine this is the UI and the request for data comes from here
* the code above and bellow does not exists
*/
const results = controller.search(departure, arrival, { maxStops: 5 })
// ----------------



console.log(`Found ${results.length} flight paths from ${departure} to ${arrival}:\n`)
console.log('Displaying top 5 cheapest paths:\n')
for (const path of results.slice(0, 5)) {
  printFlightPathArt(path)
}

