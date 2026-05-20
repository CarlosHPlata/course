import { User } from "../../dtos/User"
import { SupportedPayments } from "./SupportedPayments"

export interface PaymentRepository {
    getSupportedPayment(): SupportedPayments
    processPayment(user: User, totalPrice: number, paymentToken: string): Promise<string>
}