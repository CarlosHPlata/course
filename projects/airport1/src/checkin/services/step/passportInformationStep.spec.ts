import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../model/Context'
import { checkPassportInformationOrFail, shouldCheckPassport } from './passportInformationStep'

describe('[ Step / PassportInformationStep ]', () => {
  describe('Test when it should be execute', () => {
    it('should execute when passport is not set in session user information', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .userInformation({ passportNo: undefined })
      )

      expect(shouldCheckPassport(context)).toBeTruthy()
    })

    it('should not execute when passport is not set in session user information', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .userInformation({ passportNo: 'G123' })
      )

      expect(shouldCheckPassport(context)).toBeFalsy()
    })
  })

  describe('Test when executed', () => {
    it('should request to the user the passport field if its not sent', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ passport_number: undefined })
      )

      const response = await checkPassportInformationOrFail(context)

      expect(response).toBeFalsy()
      expect(context.getResponse().requiredFiles?.passport_number).toBeNull()
    })

    it('should set passport in sesion if its sended by the user', async () => {
      const passport = 'G123123'
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ passport_number: passport })
      ).withSessionBuilder(sesionBuilder => sesionBuilder
        .userInformation({ passportNo: undefined })
      )

      const response = await checkPassportInformationOrFail(context)

      expect(response).toBeTruthy()
      expect(context.getSession().userInformation?.passportNo).toBe(passport)
    })
  })
})
