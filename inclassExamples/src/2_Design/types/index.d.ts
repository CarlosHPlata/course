export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface Flight {
  origin: string;
  destination: string;
  price: number;
}

export interface FlightPathResult {
  path: string[];
  totalPrice: number;
}
