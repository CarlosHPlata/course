import { Flight, FlightPathResult } from "../types";
import { flights } from "../data/database";

type Stack = {
  current: string;
  path: string[];
  totalPrice: number;
  totalCo2: number;
  totalDuration: number;
}

export function findPath(
  origin: string,
  destination: string,
  maxHops: number = 6
): FlightPathResult[] {
  const stack: Stack[] = [{
    current: origin,
    path: [origin],
    totalPrice: 0,
    totalCo2: 0,
    totalDuration: 0
  }];

  const minCosts: Map<string, number> = new Map();
  minCosts.set(origin, 0);

  const results: FlightPathResult[] = [];

  while (stack.length > 0) {
    const { current, path, totalPrice, totalCo2, totalDuration } = stack.pop()!;

    if (current === destination) {
      results.push({ path, totalPrice, totalCo2, totalDuration });
      continue;
    }

    const availableFlights = flights.filter(f => f.origin === current);

    for (const flight of availableFlights) {
      const nextAirport = flight.destination;
      const nextPrice = totalPrice + flight.price;
      const nextCo2 = totalCo2 + flight.co2;
      const nextDuration = totalDuration + flight.duration;

      if (!path.includes(nextAirport) && path.length < maxHops) {
        stack.push({
          current: nextAirport,
          path: [...path, nextAirport],
          totalPrice: nextPrice,
          totalCo2: nextCo2,
          totalDuration: nextDuration
        });
      }
    }
  }

  return results.sort((a, b) => a.totalPrice - b.totalPrice);
}