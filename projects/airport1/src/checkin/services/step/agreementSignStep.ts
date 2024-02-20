import { Builder } from 'builder-pattern'
import { Context } from '../../model/Context'
import { SessionData } from '../../model/session/SessionData'
import { Session } from '../../model/session'

export function shouldCheckAgreement(context: Context): boolean {
  return !(context.getSession().data.agreementSigned ?? false)
}

export async function checkAgreementOrFail(context: Context): Promise<boolean> {
  const session = context.getSession()

  if (!isAgreementFieldFilled(context)) {
    setRequestForAgreementField(context)
    return false
  }

  setAgreementInfoInSession(context, session)
  return true
}

function setRequestForAgreementField(context: Context): void {
  context.withResponseBuilder((responseBuilder) => responseBuilder
    .status('user_information_required')
    .requiredFiles({ agreement_required: null })
  )
}

function setAgreementInfoInSession(context: Context, session: Session): void {
  context.withSessionBuilder((sessionBuilder) => sessionBuilder
    .data(
      Builder<SessionData>(session.data)
        .agreementSigned(true)
        .build()
    )
  )
}

function isAgreementFieldFilled(context: Context): boolean {
  return !!(context.getRequest().fields?.agreement_required)
}
