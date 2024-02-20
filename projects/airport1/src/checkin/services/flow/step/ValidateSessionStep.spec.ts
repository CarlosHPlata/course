import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import { validateSessionOrFail } from './validateSessionStep'

describe('[ Step / ValidateSessionStep ]', () => {
  it('should reject if session id not match', async () => {
    const context: Context = new MockContext()
      .withSessionBuilder(sb => sb.sessionId('aaa-123-123-123-123'))
      .withRequestBuilder(cb => cb.sessionId('zzz-123-123-123-123'))

    const response = await validateSessionOrFail(context)
    expect(response).toBeFalsy()
    expect(context.getResponse().status).toBe('rejected')
  })

  it('should reject if user id dont match', async () => {
    const context: Context = new MockContext()
      .withSessionBuilder(sb => sb.userId('wrong'))
      .withRequestBuilder(cb => cb.userId('dontmatch'))

    const response = await validateSessionOrFail(context)
    expect(response).toBeFalsy()
    expect(context.getResponse().status).toBe('rejected')
  })

  it('should pass if session and user id match', async () => {
    const context: Context = new MockContext()
      .withSessionBuilder(sb => sb
        .sessionId('aaa-123-123-123-123')
        .userId('match')
      )
      .withRequestBuilder(cb => cb
        .sessionId('aaa-123-123-123-123')
        .userId('match')
      )

    const response = await validateSessionOrFail(context)
    expect(response).toBeTruthy()
  })
})
