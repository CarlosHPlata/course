import { MockContext } from '@testMocks/model/Context.mock'
import CompleteCheckinStep from './CompleteCheckinStep'

describe('[Step / CompleteCheckinStep]', () => {
  const step = new CompleteCheckinStep()

  describe('Testing on execute', () => {

    it('should complete the checkin', async () => {
      const context = new MockContext()
      const response = step.onExecute(context)

      expect(response).toBeTruthy()
      expect(context.getResponse().status).toBe('completed')
      expect(context.getResponse().sessionId).toBe(context.getSession().sessionId)
    })

  })

})
