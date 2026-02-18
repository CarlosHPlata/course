import { findPath } from "./logic/pathfinder";
import { FlightPathResult } from "./types";

/**
 * Finds a flight path between two airports.
 * @param origin The airport code for the origin (e.g., "JFK")
 * @param destination The airport code for the destination (e.g., "MID")
 * @returns A FlightPathResult object containing the path and total price, or null if no path is found.
 */
export function findFlightPath(origin: string, destination: string): FlightPathResult | null {
  console.log(`Searching for flight path from ${origin} to ${destination}...`);

  const result = findPath(origin, destination);

  if (result) {
    console.log(`Path found: ${result.path.join(" -> ")}`);
    console.log(`Total Price: $${result.totalPrice}`);
  } else {
    console.log(`No path found between ${origin} and ${destination}.`);
  }

  return result;
}
