import describeFlowTest from '@framework/describeFlowTest'
import { CountryCode } from '../../src/checkin/model/Schema'
import userInteraction from '@framework/userInteraction'
import verify from '@framework/verify'

describeFlowTest('Testing MX checkin flow', (app) => {
  const country: CountryCode = 'MX'

  it('should complete the checkin', async () => {
    const sessionId = await userInteraction.initSessionWithPassport(app, country)
    const sessionInformation = { sessionId, country }

    const response = await userInteraction.continue(app, sessionInformation)

    verify.status.completed(response)
  })

})
