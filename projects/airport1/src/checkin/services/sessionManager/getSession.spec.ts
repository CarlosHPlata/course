import generateSessionMock from '@testMocks/model/Session.mock'
import * as Mapper from './mapRequestToSession'
import { makeGetSession } from './getSession'
import { Session } from '../../model/session'
import generateGetSessionRepositoryMock from '@testMocks/repositories/getSessionRepository.mock'
import generateRequestDataMock from '@testMocks/model/RequestData.mock'

describe('[ SessionManager / getSession ]', () => {
  let mapRequestToSessionMock: jest.Mock<Promise<Session>>
  let mockMakeMapper: jest.SpyInstance

  it('shold return existing session when repository responds with new session', async () => {
    // given
    const expectSession = generateSessionMock({ sessionId: '123-123-123-123-123' })
    const requestData = generateRequestDataMock()

    // when
    const sessionRepository = generateGetSessionRepositoryMock(expectSession)

    // and
    const getSession = makeGetSession(sessionRepository)

    // then
    const result = await getSession(requestData)

    expect(sessionRepository).toHaveBeenCalledWith(requestData.sessionId)
    expect(mapRequestToSessionMock).not.toHaveBeenCalled()
    expect(result.sessionId).toBe(expectSession.sessionId)
  })

  it('shoud throw when repository responds with null', async () => {
    // given
    const sessionRepository = generateGetSessionRepositoryMock(null)
    const expectSession = generateSessionMock({ sessionId: '123-123-123-123-123' })
    const requestData = generateRequestDataMock()

    // when
    expect.assertions(1)
    mapRequestToSessionMock.mockResolvedValue(expectSession)
    const getSession = makeGetSession(sessionRepository)

    // then
    try {
      await getSession(requestData)
    } catch (e) {
      expect((e as Error).message).toEqual('session does not exits')
    }
  })

  beforeEach(() => {
    mapRequestToSessionMock = jest.fn(() => Promise.resolve(generateSessionMock()))
    mockMakeMapper = jest.spyOn(Mapper, 'makeMapRequestToSession').mockImplementation(() => mapRequestToSessionMock)
  })

  afterEach(() => {
    mapRequestToSessionMock.mockClear()
    mockMakeMapper.mockClear()
  })
})
