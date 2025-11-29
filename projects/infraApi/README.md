# Project Documentation

## Database Schema

The database contains the following tables as defined in `migrations/V2__Create_Users_And_Flight_Tables.sql`:

### USERS Table
Stores user information.
- **id**: `INT` (Auto Increment, Primary Key)
- **name**: `VARCHAR(255)` (Not Null)
- **email**: `VARCHAR(255)` (Not Null)

### Flight Table
Stores flight details.
- **flightNumber**: `VARCHAR(255)` (Primary Key)
- **baseprice**: `DOUBLE` (Not Null)
- **departure**: `VARCHAR(255)` (Not Null)
- **destination**: `VARCHAR(255)` (Not Null)
- **departureDate**: `DATE` (Not Null)
- **arrivalDate**: `DATE` (Not Null)

## Payment Flows

### Bank Payment
Bank payment is a single-step process handled by the `bank.json` WireMock mapping.

- **Endpoint**: `POST /payment/bank/complete`
- **Query Parameter**: `token` (The payment token)
- **Request Body**: Must include:
  - `user.id`
  - `user.email`
  - `amount`
- **Behavior**: The endpoint signs the provided token by appending `_TSP` to it (e.g., `token123` becomes `token123_TSP`) and returns it in the response.

### Credit Payment
Credit payment is a two-step process involving authorization and capture, simulated by WireMock.

#### Step 1: Authorization
First, the credit score is authorized through 3DS.
- **Endpoint**: `POST /payment/3ds/authorize` (defined in `credit_authorize.json`)
- **Query Parameter**: `token`
- **Request Body**: Must include:
  - `userId`
  - `amount`
- **Response**: Returns `{"accepted": true}` if successful.

#### Step 2: Capture
Finally, the transaction is ended and the token is signed.
- **Endpoint**: `POST /payment/3ds/capture` (defined in `credit_capture.json`)
- **Query Parameter**: `token`
- **Behavior**: Similar to the bank payment, this endpoint signs the token by appending `_TSP` to it and returns the completed status.
