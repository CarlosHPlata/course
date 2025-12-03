import { checkingPayment } from '@infrastructure/controller/checkingPayment';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface PaymentInitRequest {
  purchaseInformation: {
    amount: number;
    cardNumber: string;
    cardExpiryDate: string;
    cardCvv: string;
    cardHolderName: string;
  }
  userId: string
  flights: {
    flightNumber: string,
    seat: { id: string, category: string }
  }[]
}

export interface PaymentInitResponse {
  status: string;
  paymentToken: string;
}

export interface CheckingPaymentResponse {
  finalPrice: number;
  status: string;
}

export const usePayment = () => {
  return useMutation<CheckingPaymentResponse, Error, PaymentInitRequest>({
    mutationFn: async ({ purchaseInformation, userId, flights }) => {
      const response = await axios.post<PaymentInitResponse>(
        'http://localhost:3001/payment/initialize',
        purchaseInformation,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { paymentToken } = response.data
      return checkingPayment({
        flights: flights.map((flight, index) => ({
          orderOfFlight: index + 1,
          flightNumber: flight.flightNumber,
          seatClass: flight.seat.category// as SeatClass
        })),
        userId,
        paymentToken
      })
    },
  });
};