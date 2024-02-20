import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../model/Context'
import { checkAgreementOrFail, shouldCheckAgreement } from './agreementSignStep'

describe('[ Step / agreementSignStep ]', () => {
  describe('Testing when it should be executed', () => {
    it('should return true when agreement has not been signed', () => {
      const context: Context = wireContextMockWithAgreementInSession(false)
      const result = shouldCheckAgreement(context)

      expect(result).toBeTruthy()
    })

    it('should return false when agreement is signed', () => {
      const context: Context = wireContextMockWithAgreementInSession(true)
      const result = shouldCheckAgreement(context)

      expect(result).toBeFalsy()
    })
  })

  describe('Testing at execution', () => {
    it('should request the agreement field to the user when is not present in a request', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({})
      )
      const result = await checkAgreementOrFail(context)

      expect(result).toBeFalsy()
      expect(context.getResponse().requiredFiles?.agreement_required).toBeNull()
    })

    it('should request the agreement field to the user if it is not signed', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ agreement_required: false })
      )

      const result = await checkAgreementOrFail(context)
      expect(result).toBeFalsy()
      expect(context.getResponse().requiredFiles?.agreement_required).toBeNull()
    })

    it('should set the agreement in session if it is signed', async () => {
      const context: Context = wireContextMockWithAgreementInSession(false)
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ agreement_required: true })
      )

      const result = await checkAgreementOrFail(context)
      expect(result).toBeTruthy()
      expect(context.getSession().data.agreementSigned).toBeTruthy()
    })
  })
})

function wireContextMockWithAgreementInSession(agreementSigned: boolean): Context {
  const context: Context = new MockContext()
  context.withSessionBuilder(sessionBuilder => sessionBuilder
    .data({
      agreementSigned,
      flights: context.getSession().data.flights
    })
  )

  return context
}
