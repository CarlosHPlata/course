import describeFlowTest from '@framework/describeFlowTest'
import { CountryCode } from '../../src/checkin/model/Schema'
import userInteraction from '@framework/userInteraction'
import verify from '@framework/verify'

describeFlowTest('Testing US checkin flow', (app) => {
  const country: CountryCode = 'US'

  it('should be asked to sign the legal agreement before completing the check in', async () => {

    const sessionId = await userInteraction.initSessionWithPassport(app, country)

    const response = await userInteraction.continue(app, { sessionId, country })
    verify.userInformation.requiredField('agreement_required', response)
  })

  it('should complete the checkin', async () => {
    const sessionId = await userInteraction.initSessionWithPassport(app, country)
    const sessionInformation = { sessionId, country }

    let response = await userInteraction.continue(app, sessionInformation)
    verify.userInformation.requiredField('agreement_required', response)

    response = await userInteraction.signLegalAgreement(app, sessionInformation)
    verify.status.completed(response)
  })

})
