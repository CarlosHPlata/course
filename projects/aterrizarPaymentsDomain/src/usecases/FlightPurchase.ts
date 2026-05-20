import { RequestPurchase } from "../dtos/RequestPurchase";
import { ResponsePurchase } from "../dtos/ResponsePurchase";
import { Tariff } from "../dtos/Tariff";
import { FlightRepository } from "../interfaces/FlightRepository";
import { PaymentRepository } from "../interfaces/PaymentRepository/PaymentRepository";
import { SupportedPayments } from "../interfaces/PaymentRepository/SupportedPayments";
import { TariffRepository } from "../interfaces/TariffRepository";
import { UserRepository } from "../interfaces/UserRepository";

export class FlightPurchase {
    private userRepo: UserRepository;
    private flightRepo: FlightRepository;
    private tariffRepo: TariffRepository;
    private paymentRepos: PaymentRepository[]

    constructor(
        userRepo: UserRepository,
        flightRepo: FlightRepository,
        tariffRepo: TariffRepository,
        paymentRepos: PaymentRepository[]
    ) {
        this.userRepo = userRepo;
        this.flightRepo = flightRepo;
        this.tariffRepo = tariffRepo;
        this.paymentRepos = paymentRepos;
    }

    /**
     * purchase
     */
    public async purchase(
        requestsPurchase: RequestPurchase[],
        userId: number, 
        paymentToken: string
    ): Promise<ResponsePurchase> {
       const user = await this.userRepo.getUserData(userId);

       const tariff:Tariff = await this.tariffRepo.getCurrentTariff();

       let totalPrice = 0;
       for (const flightInput of requestsPurchase) {
        const flight = await this.flightRepo.getFlightData(flightInput.flightNumber);

        let selectedTariff = tariff.basic;
        switch (flightInput.seatClass) {
            case "BASIC":
                selectedTariff = tariff.basic;
            case "BUSINESS":
                selectedTariff = tariff.business;
            case "FIRST":
                selectedTariff = tariff.first;
        }

        totalPrice += flight.calculateFinalPrice(selectedTariff, flightInput.orderOfFlight)
       }

       const paymentRepo = this.getSupportedPaymentRepo(paymentToken);
       const paymentResponse = await paymentRepo.processPayment(user, totalPrice, paymentToken);
       const isAccpeted = this.isPaymentAccepted(paymentResponse);

       return {
        totalPrice,
        accepted: isAccpeted? 'APPROVED': 'DECLINED'
       };
    }

    private getSupportedPaymentRepo(token: string) {
        const parts = token.split("_");
        const prefix = parts[0];

        for (const repo of this.paymentRepos) {
            if (repo.getSupportedPayment() === prefix) {
                return repo;
            }
        }

        throw new Error('Payment method not supported');
    }

    private isPaymentAccepted(tokenResponse: string) {
        const EXPECTED_SUFIX = 'TSP';
        const parts = tokenResponse.split("_");
        const sufix = parts[parts.length - 1];

        return sufix === EXPECTED_SUFIX;
    }
}