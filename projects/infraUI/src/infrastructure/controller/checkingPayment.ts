export interface CheckingPaymentProps {
  flights: {
    orderOfFlight: number,
    flightNumber: string,
    seatClass: string //SeatClass
  }[]
  userId: string
  paymentToken: string
}

export const checkingPayment = async (_: CheckingPaymentProps) => {
  throw new Error('Not implemented')
}