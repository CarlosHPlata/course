import { FlightPathResult } from "../types";
import { flights } from "../data/database";

type Stack = {
  current: string;
  path: string[];
  totalPrice: number;
}

export function findPath(
  origin: string,
  destination: string
): FlightPathResult | null {
  const stack: Stack[] = [{
    current: origin,
    path: [origin],
    totalPrice: 0
  }];

  const minCosts: Map<string, number> = new Map();
  minCosts.set(origin, 0);

  let bestResult: FlightPathResult | null = null;

  while (stack.length > 0) {
    const { current, path, totalPrice } = stack.pop()!;

    // Base case: destination reached
    if (current === destination) {
      if (!bestResult || totalPrice < bestResult.totalPrice) {
        bestResult = { path, totalPrice };
      }
      continue;
    }

    // Explore neighbors
    const availableFlights = flights.filter(f => f.origin === current);

    for (const flight of availableFlights) {
      const nextAirport = flight.destination;
      const nextPrice = totalPrice + flight.price;

      const bestCostSoFar = minCosts.get(nextAirport);

      if (!path.includes(nextAirport) && (bestCostSoFar === undefined || nextPrice < bestCostSoFar)) {
        minCosts.set(nextAirport, nextPrice);
        stack.push({
          current: nextAirport,
          path: [...path, nextAirport],
          totalPrice: nextPrice
        });
      }
    }
  }

  return bestResult;
}
