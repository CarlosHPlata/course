import describeFlowTest from '@framework/describeFlowTest'
import verify from '@framework/verify'
import userInteraction from '@framework/userInteraction'

describeFlowTest('Testing US Flow', (app) => {
  it('should reject if userId does not match', async () => {
    const userId = '123'
    const sessionId = await userInteraction.initSession(app, { userId })

    const response = await userInteraction.continue(app, sessionId, { userId: 'wrongId' })
    verify.status.rejected(response)
  })

  it('should be asked to provide passport number when sending no passport information ', async () => {
    const sessionId = await userInteraction.initSession(app)

    const response = await userInteraction.continue(app, sessionId)
    verify.userInformation.requiredField('passport_number', response)
  })

  it('should be asked to sign the legal agreement before completing the check in', async () => {
    const sessionId = await userInteraction.initSessionWithPassport(app)

    const response = await userInteraction.continue(app, sessionId)
    verify.userInformation.requiredField('agreement_required', response)
  })

  it('should complete the checkin', async () => {
    const sessionId = await userInteraction.initSessionWithPassport(app)

    let response = await userInteraction.continue(app, sessionId)
    verify.userInformation.requiredField('agreement_required', response)

    response = await userInteraction.signLegalAgreement(app, sessionId)
    verify.status.completed(response)
  })
})
