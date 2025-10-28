import { FlightStore } from './src/SkyScanner/extras/FlightStore'
import { Airport } from './src/SkyScanner/model/Airport'
import { Flight } from './src/SkyScanner/model/Flight'
import moment from 'moment'

const flightStore = FlightStore.getInstance()

export const airports: Airport[] = [
  { id: 'MID', code: 'MID', name: 'Manuel C. Rejon Int. Airport', city: 'Merida', flights: [] },
  { id: 'ARN', code: 'ARN', name: 'Arlanda Airport', city: 'Stockholm', flights: [] },
  { id: 'JFK', code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', flights: [] },
  { id: 'CDG', code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', flights: [] },
  { id: 'AMS', code: 'AMS', name: 'Schiphol', city: 'Amsterdam', flights: [] },
  { id: 'FRA', code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', flights: [] },
  { id: 'MAD', code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', flights: [] },
  { id: 'LHR', code: 'LHR', name: 'London Heathrow Airport', city: 'London', flights: [] },
  { id: 'IST', code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', flights: [] },
  { id: 'CPH', code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', flights: [] }
]

function createConnection(from: Airport, to: Airport, lastFlightTime?: string): Omit<Flight, 'id'> {
  let startTime: string
  if (lastFlightTime) {
    const minNextStart = moment(lastFlightTime).add(2, 'hours')
    const randomOffset = Math.floor(Math.random() * 4)
    startTime = minNextStart.add(randomOffset, 'hours').toISOString()
  } else {
    const randomMonth = Math.floor(Math.random() * 12)
    const randomDay = Math.floor(Math.random() * 28) + 1
    const randomHour = Math.floor(Math.random() * 24)
    startTime = moment({
      year: 2025,
      month: randomMonth,
      day: randomDay,
      hour: randomHour
    }).toISOString()
  }

  const durationHours = Math.floor(Math.random() * 11) + 2
  const endTime = moment(startTime).add(durationHours, 'hours').toISOString()

  return {
    from,
    to,
    durationMinutes: durationHours * 60,
    costUSD: Math.random() * 500,
    startTime,
    endTime,
    flightNumber: `AT${Math.random().toString(36).substring(2, 7).toUpperCase()}`
  }
}

function getRandomStops(allAirports: Airport[], count: number, start: Airport, end: Airport): Airport[] {
  const connectionAirports = allAirports.filter(
    a => a.id !== start.id && a.id !== end.id
  )

  const connected = connectionAirports
    .sort(() => Math.random() - 0.5)
    .slice(0, count)

  return [start, ...connected, end]
}

function createFlights(start: Airport, end: Airport, maxStops: number) {
  for (let i = 0; i <= maxStops; i++) {
    const stops = getRandomStops(airports, i, start, end)

    let firstStop = start
    let lastFlightTime: string | undefined
    for (let secondStop = 1; secondStop < stops.length; secondStop++) {
      const flight = createConnection(firstStop, stops[secondStop], lastFlightTime)
      lastFlightTime = flight.endTime
      flightStore.createFlight(flight)

      firstStop = stops[secondStop]
    }
  }
}

function createRandomFlights(airports: any[], count: number) {
  for (let i = 0; i < count; i++) {
    const fromIndex = Math.floor(Math.random() * airports.length)
    let toIndex = Math.floor(Math.random() * airports.length)
    // Ensure from and to are not the same
    while (toIndex === fromIndex) {
      toIndex = Math.floor(Math.random() * airports.length)
    }
    const from = airports[fromIndex]
    const to = airports[toIndex]
    const stopsCount = Math.floor(Math.random() * Math.min(3, airports.length - 2))
    createFlights(from, to, stopsCount)
  }
}

export function resetData() {
  createRandomFlights(airports, 50)
  createFlights(airports[0], airports[1], 8)
}
