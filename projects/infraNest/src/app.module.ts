import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './infrastructure/controller/app.controller';
import { UserAggregate } from './infrastructure/dbentities/UserAggregate';
import { UserRepository } from './infrastructure/repository/UserRepository';
import { FlightAggregate } from './infrastructure/dbentities/FlightAggregate';
import { FlightRepository } from './infrastructure/repository/FlightRepository';
import { TariffGateway } from './infrastructure/gateway/TariffGateway';
import { TariffGatewayToken } from './domain/interfaces/ITariffGateway';
import { BankPaymentMethod } from './infrastructure/gateway/paymentMethods/BankPaymentMethod';
import { CreditPaymentMethod } from './infrastructure/gateway/paymentMethods/CreditPaymentMethod';
import { PaymentMethodToken } from './domain/interfaces/IPaymentMethod';
import { UserRepositoryToken } from './domain/interfaces/IUserRepository';
import { FlightRepositoryToken } from './domain/interfaces/IFlightRepository';
import { FlightPurchase } from './domain/usecases/FlightPurchase';
import { PaymentFactory } from './domain/usecases/PaymentFactory';
import { PayController } from './infrastructure/controller/pay.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'ticketdb',
      entities: [UserAggregate, FlightAggregate],
      synchronize: false, // Set to false since we're using Flyway migrations
    }),
    TypeOrmModule.forFeature([UserAggregate, FlightAggregate]),
  ],
  controllers: [AppController, PayController],
  providers: [
    FlightPurchase,
    PaymentFactory,
    {
      useClass: UserRepository,
      provide: UserRepositoryToken,
    },
    {
      useClass: FlightRepository,
      provide: FlightRepositoryToken,
    },
    {
      provide: TariffGatewayToken,
      useClass: TariffGateway,
    },
    BankPaymentMethod,
    CreditPaymentMethod,
    {
      provide: PaymentMethodToken,
      useFactory: (bankPayment: BankPaymentMethod, creditPayment: CreditPaymentMethod) => [
        bankPayment,
        creditPayment,
      ],
      inject: [BankPaymentMethod, CreditPaymentMethod],
    },
  ],
})
export class AppModule { }
