import { Builder } from 'builder-pattern'
import { Airport, FlightData } from '../../../src/checkin/model/session/FlightData'

const MOCKED_FLIGHT_DATA: FlightData = {
  flightNumber: 'ABC123',
  price: 500,
  from: {
    name: 'JFK',
    country: 'US'
  },
  to: {
    name: 'LAX',
    country: 'US'
  }
}

const generateFlightDataMock = (mockedData?: Partial<FlightData>): FlightData => {
  let builder = Builder<FlightData>(MOCKED_FLIGHT_DATA)

  if (mockedData != null) {
    builder = builder
      .flightNumber(mockedData.flightNumber ?? MOCKED_FLIGHT_DATA.flightNumber)
      .price(parseInt(mockedData.flightNumber ?? MOCKED_FLIGHT_DATA.flightNumber))
  }

  if (mockedData?.from != null) {
    builder = builder
      .from(mapAirportMock(mockedData.from))
  }

  if (mockedData?.to != null) {
    builder = builder
      .to(mapAirportMock(mockedData.to))
  }

  return builder.build()
}

const mapAirportMock = (mockedData: Partial<Airport>): Airport => ({
  name: mockedData.name ?? MOCKED_FLIGHT_DATA.from.name,
  country: mockedData.country ?? MOCKED_FLIGHT_DATA.from.country
})

export default generateFlightDataMock
