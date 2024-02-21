import describeFlowTest from '@framework/describeFlowTest'
import verify from '@framework/verify'
import userInteraction from '@framework/userInteraction'
import { CountryCode } from '../../src/checkin/model/Schema'

describeFlowTest('Testing Standard checkin Flow', (app) => {

  const SCENARIOS: CountryCode[] = [
    'US',
    'MX'
  ]

  for (const country of SCENARIOS) {

    it(`should reject if userId does not match for ${country}`, async () => {
      const userId = '123'
      const sessionId = await userInteraction.initSession(app, country, { userId })
      const sessionInformation = { sessionId, country }

      const response = await userInteraction.continue(app, sessionInformation, { userId: 'wrongId' })
      verify.status.rejected(response)
    })

    it(`should be asked to provide passport number when sending no passport information for ${country}`, async () => {
      const sessionId = await userInteraction.initSession(app, country)
      const sessionInformation = { sessionId, country }

      const response = await userInteraction.continue(app, sessionInformation)
      verify.userInformation.requiredField('passport_number', response)
    })

  }

})
