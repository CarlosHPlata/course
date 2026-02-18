import { findPath } from "./logic/pathfinder";
import { FlightPathResult } from "./types";

/**
 * Finds a flight path between two airports.
 * @param origin The airport code for the origin (e.g., "JFK")
 * @param destination The airport code for the destination (e.g., "MID")
 * @returns A FlightPathResult object containing the path and total price, or null if no path is found.
 */
export function findFlightPath(origin: string, destination: string): FlightPathResult[] {
  console.log(`Searching for flight paths from ${origin} to ${destination}...`);

  const results = findPath(origin, destination);

  if (results.length > 0) {
    console.log(`Found ${results.length} path(s):`);
    results.forEach((result, index) => {
      console.log(`  Option ${index + 1}: ${result.path.join(" -> ")} ($${result.totalPrice})`);
    });
  } else {
    console.log(`No path found between ${origin} and ${destination}.`);
  }

  return results;
}
