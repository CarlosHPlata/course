export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface Flight {
  origin: string;
  destination: string;
  price: number;
  co2: number;
  duration: number;
}

export interface FlightPathResult {
  path: string[];
  totalPrice: number;
  totalCo2: number;
  totalDuration: number;
}
