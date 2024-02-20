import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import PassportInformationStep from './PassportInformationStep'

describe('[ Step / PassportInformationStep ]', () => {
  const step = new PassportInformationStep()

  describe('Test when it should be execute', () => {
    it('should execute when passport is not set in session user information', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .userInformation({ passportNo: undefined })
      )

      expect(step.when(context)).toBeTruthy()
    })

    it('should not execute when passport is not set in session user information', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .userInformation({ passportNo: 'G123' })
      )

      expect(step.when(context)).toBeFalsy()
    })
  })

  describe('Test when executed', () => {
    it('should request to the user the passport field if its not sent', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ passport_number: undefined })
      )

      const response = await step.onExecute(context)

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

      const response = await step.onExecute(context)

      expect(response).toBeTruthy()
      expect(context.getSession().userInformation?.passportNo).toBe(passport)
    })
  })
})
