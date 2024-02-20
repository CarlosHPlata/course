import { Context } from '../../model/Context'

export const validateSessionOrFail = async (context: Context): Promise<boolean> => {
  const session = context.getSession()
  const requestData = context.getRequest()

  if (session.sessionId !== requestData.sessionId) {
    rejectRequest(context)
    return false
  }

  if (session.userId !== requestData.userId) {
    rejectRequest(context)
    return false
  }

  return true
}

const rejectRequest = (context: Context): Context => context.withResponseBuilder(
  (responseBulder) => responseBulder
    .status('rejected')
)
