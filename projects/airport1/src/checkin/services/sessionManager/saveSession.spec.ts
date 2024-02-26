import generateSaveSessionRepositoryMock from '@testMocks/repositories/saveSessionRepository.mock'
import { DEFAULT_TTL, makeSaveSession } from './saveSession'
import generateSessionMock from '@testMocks/model/Session.mock'

describe('[ SessionManager / saveSession ]', () => {
  it('should send to save a session with correct TTL', async () => {
    const saveRepositoryMock = generateSaveSessionRepositoryMock()
    const saveSession = makeSaveSession(saveRepositoryMock)
    const session = generateSessionMock()

    await saveSession(session)

    expect(saveRepositoryMock).toHaveBeenCalledWith(session, parseInt(DEFAULT_TTL))
  })
})
