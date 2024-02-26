import { IFlightRepository } from '../../../src/checkin/interfaces/IFlightsRepository'
import { FlightData } from '../../../src/checkin/model/session/FlightData'

const generateFlightRepositoryMock =
  (mock: FlightData[]): IFlightRepository => jest.fn(
    () => Promise.resolve(mock)
  )

export default generateFlightRepositoryMock
