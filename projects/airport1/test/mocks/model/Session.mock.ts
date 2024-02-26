import { Builder, IBuilder } from 'builder-pattern'
import { Session } from '../../../src/checkin/model/session'
import { SessionData } from '../../../src/checkin/model/session/SessionData'
import { UserInformation } from '../../../src/checkin/model/session/UserInformation'

const MOCK_SESSION: Session = {
  sessionId: '123-123-123-123-123',
  userId: 'user123',
  data: {
    country: 'US',
    flights: [
      {
        flightNumber: 'ABC123',
        price: 500,
        from: {
          name: 'JFK',
          country: 'US'
        },
        to: {
          name: 'LAX',
          country: 'US'
        }
      },
      {
        flightNumber: 'XYZ456',
        price: 700,
        from: {
          name: 'LHR',
          country: 'GB'
        },
        to: {
          name: 'CDG',
          country: 'FR'
        }
      }
    ]
  },
  userInformation: {
    passportNo: 'G123'
  }
}

const generateSessionMock = (mockedData?: Partial<Session>): Session => {
  let builder = Builder<Session>(MOCK_SESSION)

  if (mockedData != null) {
    builder = fillSessionWithUserMockData(mockedData, builder)
  }

  return builder.build()
}

const fillSessionWithUserMockData = (mockedData: Partial<Session>, builder: IBuilder<Session>): IBuilder<Session> => {
  builder = builder
    .sessionId(mockedData.sessionId ?? MOCK_SESSION.sessionId)
    .userId(mockedData.userId ?? MOCK_SESSION.userId)

  if (mockedData.data != null) {
    const data = Builder<SessionData>()
      .agreementSigned(mockedData.data.agreementSigned ?? false)
      .country(mockedData.data.country ?? MOCK_SESSION.data.country)
      .flights(mockedData.data.flights ?? MOCK_SESSION.data.flights)
      .build()

    builder = builder.data(data)
  }

  if (mockedData.userInformation != null) {
    const userInfo = Builder<UserInformation>()
      .passportNo(mockedData.userInformation.passportNo ?? MOCK_SESSION.userInformation.passportNo)
      .build()

    builder = builder.userInformation(userInfo)
  }

  return builder
}

export default generateSessionMock
