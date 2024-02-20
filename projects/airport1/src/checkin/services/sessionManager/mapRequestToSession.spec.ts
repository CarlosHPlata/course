import generateFlightDataMock from '@testMocks/model/FlightData.mock'
import generateRequestDataMock from '@testMocks/model/RequestData.mock'
import generateFlightRepositoryMock from '@testMocks/repositories/flightRepository.mock'
import { makeMapRequestToSession } from './mapRequestToSession'
import * as Crypto from 'crypto'

jest.mock('crypto', () => ({
  randomUUID: jest.fn()
}))

describe('[ SessionManager / mapRequestToSession ]', () => {
  it('should map the request as session corectly', async () => {
    const requestData = generateRequestDataMock()
    const flightDataMock = generateFlightDataMock()
    const flightRepositoryMock = generateFlightRepositoryMock([
      flightDataMock
    ])

    const mapRequestToSession = makeMapRequestToSession(flightRepositoryMock)

    const response = await mapRequestToSession(requestData)

    expect(response.userId).toEqual(requestData.userId)
    expect(response.data.flights).toEqual([flightDataMock])
  })

  it('should return a brand new UUID for new sessions', async () => {
    const expectedId = '123-123-123-123-123'
    const requestData = generateRequestDataMock()

    jest.spyOn(Crypto, 'randomUUID').mockReturnValue(expectedId)
    const flightDataMock = generateFlightDataMock()
    const flightRepositoryMock = generateFlightRepositoryMock([flightDataMock])
    const mapRequestToSession = makeMapRequestToSession(flightRepositoryMock)

    const response = await mapRequestToSession(requestData)
    expect(response.sessionId).toBe(expectedId)
  })
})
