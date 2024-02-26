import { ISaveSessionRepository } from '../../../src/checkin/interfaces/ISessionRepository'

const generateSaveSessionRepositoryMock =
  (): ISaveSessionRepository => jest.fn(
    () => Promise.resolve()
  )

export default generateSaveSessionRepositoryMock
