import { Builder } from 'builder-pattern'
import { Context } from '../../../model/Context'
import { SessionData } from '../../../model/session/SessionData'
import { Session } from '../../../model/session'
import StepTemplate from '../StepTemplate'

export default class AgreementSignStep extends StepTemplate {

  when(context: Context): boolean {
    return !(context.getSession().data.agreementSigned ?? false)
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()

    if (!this.isAgreementFieldFilled(context)) {
      this.setRequestForAgreementField(context)
      return Promise.resolve(false)
    }

    this.setAgreementInfoInSession(context, session)
    return Promise.resolve(true)
  }

  private setRequestForAgreementField(context: Context): void {
    context.withResponseBuilder((responseBuilder) => responseBuilder
      .status('user_information_required')
      .requiredFiles({ agreement_required: null })
    )
  }

  private setAgreementInfoInSession(context: Context, session: Session): void {
    context.withSessionBuilder((sessionBuilder) => sessionBuilder
      .data(
        Builder<SessionData>(session.data)
          .agreementSigned(true)
          .build()
      )
    )
  }

  private isAgreementFieldFilled(context: Context): boolean {
    return !!(context.getRequest().fields?.agreement_required)
  }
}
