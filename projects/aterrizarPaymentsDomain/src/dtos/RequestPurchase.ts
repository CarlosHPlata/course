
export type RequestPurchase = {
 orderOfFlight: number;
 flightNumber: number;
 seatClass: 'BASIC' | 'BUSINESS' | 'FIRST';
}