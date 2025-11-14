## User Story: Complete Flight Purchase

**As a** user  
**I want** to complete the payment for my selected flights by providing flight numbers, seat classes, my user ID, and a payment token  
**So that** I can finalize my booking and receive a clear approval or rejection along with the final total price.

---

## Flow Description

**input:**
- `Array<{ orderOfFlight, flightNumber, seatClass(BASIC|BUSINESS|FIRST) }>`
- `userId`
- `paymentToken(BANK_<UUID>)`

**output:**
- `status(APPROVED | DECLINED)`
- `finalPrice`

The user submits a purchase request containing the flights to buy, the chosen seat class for each flight, the user ID, and a payment token.

1. The system retrieves the user information using `userId` which will contain the `email`.

2. For every `flightNumber` provided, the system retrieves the flight data, which among other information it includes the `basePrice` and the seat availability.

3. The system requests the current tariff for each flight’s selected seat class from the pricing source, returning `{basic: number, business: number, first: number}`.

4. Each flight will calculate its final price using:  
   **`finalPrice = basePrice + classTariff - (basePrice * 0.1 * orderOfFlight)`**

5. The system sums all final prices to obtain `totalPrice`.

6. The system determines the payment provider method based on the payment token prefix.  
(*For now, only `BANK_` tokens are supported for direct payment*)
The system sends the payment request (`userId`, `email`, `token`, `paymentToken`) to the corresponding payment provider.

7. The payment provider responds with a signed token.  
   - A valid signed token ends with `_TSP`

8. If the signature is valid:  
    - The purchase is marked **APPROVED**.  
    - The final price is returned.

9. If the signature is invalid or any error occurs:  
    - The purchase is marked **DECLINED**, along with the total price.

