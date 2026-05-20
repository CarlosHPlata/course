import { RequestPurchase } from "../dtos/RequestPurchase";
import { Tariff } from "../dtos/Tariff";
import { User } from "../dtos/User";
import { Flight } from "../entities/Flight";
import { FlightRepository } from "../interfaces/FlightRepository";
import { PaymentRepository } from "../interfaces/PaymentRepository/PaymentRepository";
import { TariffRepository } from "../interfaces/TariffRepository";
import { UserRepository } from "../interfaces/UserRepository";
import { FlightPurchase } from "./FlightPurchase";

describe("FlightPurchase", () => {
    const user: User = { userId: 1, email: "test@example.com" };
    const tariff: Tariff = { basic: 100, business: 300, first: 500 };
    const bankToken = "BANK_abc-123";

    let userRepo: jest.Mocked<UserRepository>;
    let flightRepo: jest.Mocked<FlightRepository>;
    let tariffRepo: jest.Mocked<TariffRepository>;
    let bankPaymentRepo: jest.Mocked<PaymentRepository>;
    let credPaymentRepo: jest.Mocked<PaymentRepository>;
    let flight: Flight;
    let calculateFinalPriceSpy: jest.SpyInstance;
    let flightPurchase: FlightPurchase;

    beforeEach(() => {
        flight = new Flight(123, 1000);
        calculateFinalPriceSpy = jest.spyOn(flight, "calculateFinalPrice");

        userRepo = { getUserData: jest.fn().mockResolvedValue(user) };
        flightRepo = { getFlightData: jest.fn().mockResolvedValue(flight) };
        tariffRepo = { getCurrentTariff: jest.fn().mockResolvedValue(tariff) };

        bankPaymentRepo = {
            getSupportedPayment: jest.fn().mockReturnValue("BANK"),
            processPayment: jest.fn().mockResolvedValue("SIGNED_TSP"),
        };
        credPaymentRepo = {
            getSupportedPayment: jest.fn().mockReturnValue("CRED"),
            processPayment: jest.fn().mockResolvedValue("SIGNED_TSP"),
        };

        flightPurchase = new FlightPurchase(
            userRepo,
            flightRepo,
            tariffRepo,
            [bankPaymentRepo, credPaymentRepo],
        );
    });

    const singleFirstClassRequest: RequestPurchase[] = [
        { orderOfFlight: 0, flightNumber: 123, seatClass: "FIRST" },
    ];

    it("fetches user, tariff, and flight data from repositories", async () => {
        await flightPurchase.purchase(singleFirstClassRequest, user.userId, bankToken);

        expect(userRepo.getUserData).toHaveBeenCalledWith(user.userId);
        expect(tariffRepo.getCurrentTariff).toHaveBeenCalledTimes(1);
        expect(flightRepo.getFlightData).toHaveBeenCalledWith(123);
    });

    it("calculates the final price using the FIRST class tariff", async () => {
        await flightPurchase.purchase(singleFirstClassRequest, user.userId, bankToken);

        expect(calculateFinalPriceSpy).toHaveBeenCalledWith(tariff.first, 0);
    });

    it("iterates over every requested flight", async () => {
        const requests: RequestPurchase[] = [
            { orderOfFlight: 0, flightNumber: 123, seatClass: "FIRST" },
            { orderOfFlight: 1, flightNumber: 456, seatClass: "FIRST" },
            { orderOfFlight: 2, flightNumber: 789, seatClass: "FIRST" },
        ];

        await flightPurchase.purchase(requests, user.userId, bankToken);

        expect(flightRepo.getFlightData).toHaveBeenCalledTimes(3);
        expect(flightRepo.getFlightData).toHaveBeenNthCalledWith(1, 123);
        expect(flightRepo.getFlightData).toHaveBeenNthCalledWith(2, 456);
        expect(flightRepo.getFlightData).toHaveBeenNthCalledWith(3, 789);
        expect(calculateFinalPriceSpy).toHaveBeenCalledTimes(3);
    });

    it("passes the order of flight to the price calculation", async () => {
        const requests: RequestPurchase[] = [
            { orderOfFlight: 2, flightNumber: 123, seatClass: "FIRST" },
        ];

        await flightPurchase.purchase(requests, user.userId, bankToken);

        expect(calculateFinalPriceSpy).toHaveBeenCalledWith(tariff.first, 2);
    });

    it("dispatches payment to the repo matching the token prefix", async () => {
        await flightPurchase.purchase(singleFirstClassRequest, user.userId, bankToken);

        expect(bankPaymentRepo.processPayment).toHaveBeenCalledWith(user, 1500, bankToken);
        expect(credPaymentRepo.processPayment).not.toHaveBeenCalled();
    });

    it("dispatches to the CRED repo when the token prefix is CRED", async () => {
        const credToken = "CRED_xyz-999";

        await flightPurchase.purchase(singleFirstClassRequest, user.userId, credToken);

        expect(credPaymentRepo.processPayment).toHaveBeenCalledWith(user, 1500, credToken);
        expect(bankPaymentRepo.processPayment).not.toHaveBeenCalled();
    });

    it("rejects when no payment repo supports the token prefix", async () => {
        await expect(
            flightPurchase.purchase(singleFirstClassRequest, user.userId, "PAYPAL_zzz"),
        ).rejects.toThrow("Payment method not supported");
    });

    it("returns APPROVED with the total price when the signed token ends with _TSP", async () => {
        bankPaymentRepo.processPayment.mockResolvedValue("ANY_PROVIDER_TSP");

        const response = await flightPurchase.purchase(singleFirstClassRequest, user.userId, bankToken);

        // basePrice 1000 + first 500 - (1000 * 0.1 * 0) = 1500
        expect(response).toEqual({ totalPrice: 1500, accepted: "APPROVED" });
    });

    it("returns DECLINED with the total price when the signed token does not end with _TSP", async () => {
        bankPaymentRepo.processPayment.mockResolvedValue("ANY_PROVIDER_REJECTED");

        const response = await flightPurchase.purchase(singleFirstClassRequest, user.userId, bankToken);

        expect(response).toEqual({ totalPrice: 1500, accepted: "DECLINED" });
    });

    it("sums the final prices of all flights into totalPrice", async () => {
        const requests: RequestPurchase[] = [
            { orderOfFlight: 0, flightNumber: 123, seatClass: "FIRST" },
            { orderOfFlight: 1, flightNumber: 456, seatClass: "FIRST" },
            { orderOfFlight: 2, flightNumber: 789, seatClass: "FIRST" },
        ];

        const response = await flightPurchase.purchase(requests, user.userId, bankToken);

        // 1500 + 1400 + 1300
        expect(response.totalPrice).toBe(4200);
        expect(bankPaymentRepo.processPayment).toHaveBeenCalledWith(user, 4200, bankToken);
    });
});
