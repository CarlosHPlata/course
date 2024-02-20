import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import AgreementSignStep from './AgreementSignStep'

describe('[ Step / agreementSignStep ]', () => {
  const step = new AgreementSignStep()

  describe('Testing when it should be executed', () => {
    it('should return true when agreement has not been signed', () => {
      const context: Context = wireContextMockWithAgreementInSession(false)
      const result = step.when(context)

      expect(result).toBeTruthy()
    })

    it('should return false when agreement is signed', () => {
      const context: Context = wireContextMockWithAgreementInSession(true)
      const result = step.when(context)

      expect(result).toBeFalsy()
    })
  })

  describe('Testing at execution', () => {
    it('should request the agreement field to the user when is not present in a request', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({})
      )
      const result = await step.onExecute(context)

      expect(result).toBeFalsy()
      expect(context.getResponse().requiredFiles?.agreement_required).toBeNull()
    })

    it('should request the agreement field to the user if it is not signed', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ agreement_required: false })
      )

      const result = await step.onExecute(context)
      expect(result).toBeFalsy()
      expect(context.getResponse().requiredFiles?.agreement_required).toBeNull()
    })

    it('should set the agreement in session if it is signed', async () => {
      const context: Context = wireContextMockWithAgreementInSession(false)
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ agreement_required: true })
      )

      const result = await step.onExecute(context)
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
      country: context.getSession().data.country,
      flights: context.getSession().data.flights
    })
  )

  return context
}
