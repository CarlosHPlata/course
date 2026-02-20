import { findPath, OrderByTotalCo2, OrderByTotalPrice } from "./logic/pathfinder";
import { FlightPathResult } from "./types";


/**
 * Formats duration in minutes to a more readable string (e.g., 2h 30m).
 */
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

/**
 * Finds a flight path between two airports.
 * @param origin The airport code for the origin (e.g., "JFK")
 * @param destination The airport code for the destination (e.g., "MID")
 * @returns A FlightPathResult object containing the path and total price, or null if no path is found.
 */
export function findFlightPath(origin: string, destination: string): FlightPathResult[] {
  console.log(`\n✈️  Searching for flight paths: ${origin} ➔ ${destination}`);
  console.log("━".repeat(60));

  const results = findPath(origin, destination, new OrderByTotalPrice(new OrderByTotalCo2()));
  // const results = findPath(origin, destination, new OrderByTotalPrice());
  // const results = findPath(origin, destination, (new OrderByTotalCo2()));

  if (results.length > 0) {
    console.log(`✅ Found ${results.length} path(s):`);
    results.forEach((result, index) => {
      const pathStr = result.path.join(" ➔ ");
      const priceStr = `$${result.totalPrice.toLocaleString()}`.padEnd(8);
      const co2Str = `${result.totalCo2}kg CO2`.padEnd(12);
      const durationStr = formatDuration(result.totalDuration).padEnd(8);

      console.log(`  [Option ${index + 1}]`);
      console.log(`  Path:     ${pathStr}`);
      console.log(`  Details:  ${priceStr} | ${co2Str} | ${durationStr}`);
      console.log("  " + "┈".repeat(50));
    });
  } else {
    console.log(`❌ No path found between ${origin} and ${destination}.`);
  }

  return results;
}
