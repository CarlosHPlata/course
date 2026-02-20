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
  orderMethod: Ordenable,
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

  return results.sort((a, b) => orderMethod.execute(a, b));
}

abstract class Ordenable {

  private component: Ordenable;

  constructor(component?: Ordenable) {
    this.component = component;
  }

  protected abstract order(a: FlightPathResult, b: FlightPathResult): number;

  execute(a: FlightPathResult, b: FlightPathResult): number {
    if (this.component == null) return this.order(a, b)
    const result = this.component.execute(a, b);
    return result + this.order(a, b);
  }
}

export class OrderByTotalCo2 extends Ordenable {
  order(a: FlightPathResult, b: FlightPathResult): number {
    return a.totalCo2 - b.totalCo2
  }
}

export class OrderByTotalPrice extends Ordenable {
  order(a: FlightPathResult, b: FlightPathResult): number {
    return a.totalPrice - b.totalPrice
  }
}
