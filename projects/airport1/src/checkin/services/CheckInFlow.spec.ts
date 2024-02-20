import * as passportInformationStep from './step/passportInformationStep'
import * as agreementSignStep from './step/agreementSignStep'
import sessionUtils from './sessionManager'
import { Session } from '../model/session'
import { checkInFlow } from './CheckInFlow'
import generateRequestDataMock from '@testMocks/model/RequestData.mock'
import generateSessionMock from '@testMocks/model/Session.mock'

describe('testing check in flow', () => {
  let shouldCheckPassportMock: jest.SpyInstance<boolean>
  let checkPassportInformationOrFailMock: jest.SpyInstance<Promise<boolean>>
  let shouldCheckAgreementMock: jest.SpyInstance<boolean>
  let checkAgreementOrFail: jest.SpyInstance<Promise<boolean>>
  let getSessionMock: jest.SpyInstance<Promise<Session>>
  let saveSessionMock: jest.SpyInstance<Promise<void>>

  it('should init the flow correctly', async () => {
    const requestData = generateRequestDataMock()
    await checkInFlow(requestData)

    expect(getSessionMock).toHaveBeenCalledWith(requestData)
  })

  it('should end the flow correctly', async () => {
    const response = await checkInFlow(generateRequestDataMock())

    expect(response.status).toBe('completed')
  })

  beforeEach(() => {
    shouldCheckPassportMock = jest.spyOn(passportInformationStep, 'shouldCheckPassport').mockImplementation(() => false)
    checkPassportInformationOrFailMock = jest.spyOn(passportInformationStep, 'checkPassportInformationOrFail').mockImplementation(() => Promise.resolve(true))

    shouldCheckAgreementMock = jest.spyOn(agreementSignStep, 'shouldCheckAgreement').mockImplementation(() => false)
    checkAgreementOrFail = jest.spyOn(agreementSignStep, 'checkAgreementOrFail').mockImplementation(() => Promise.resolve(true))

    getSessionMock = jest.spyOn(sessionUtils, 'getSession').mockImplementation(() => Promise.resolve(generateSessionMock()))
    saveSessionMock = jest.spyOn(sessionUtils, 'saveSession').mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    shouldCheckPassportMock.mockRestore()
    checkPassportInformationOrFailMock.mockRestore()

    shouldCheckAgreementMock.mockRestore()
    checkAgreementOrFail.mockRestore()

    getSessionMock.mockRestore()
    saveSessionMock.mockRestore()
  })
})
