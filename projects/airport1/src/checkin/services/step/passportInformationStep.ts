import { Builder } from 'builder-pattern'
import { Context } from '../../model/Context'
import { UserInformation } from '../../model/session/UserInformation'

export function shouldCheckPassport(context: Context): boolean {
  const session = context.getSession()
  return session.userInformation.passportNo === undefined
}

export async function checkPassportInformationOrFail(context: Context): Promise<boolean> {
  const session = context.getSession()
  const requestData = context.getRequest()

  if (requestData.fields?.passport_number == null) {
    context = context.withResponseBuilder((responseBuilder) => responseBuilder
      .status('user_information_required')
      .requiredFiles({ passport_number: null })
    )
    return false
  }

  context = context.withSessionBuilder((sessionBuilder) => sessionBuilder
    .userInformation(
      Builder<UserInformation>(session.userInformation)
        .passportNo((requestData.fields?.passport_number as string))
        .build()
    )
  )

  return true
}
