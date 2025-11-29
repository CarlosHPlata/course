import { Router, Request, Response } from 'express';
import { FlightPurchase } from '../../domain/usecases/FlightPurchase';
import { FlightPurchaseAggregate } from '../../domain/aggregates/flightPurchaseAggregate';
import { FlightRepository } from '../repositories/FlightRepository';
import { UserRepository } from '../repositories/UserRepository';
import { TariffGateway } from '../gateways/TariffGateway';
import { PaymentFactory } from '../../domain/usecases/PaymentFactory';
import { BankPaymentMethod } from '../gateways/paymentMethods/BankPaymentMethod';
import { CreditPaymentMethod } from '../gateways/paymentMethods/CreditPaymentMethod';

const router = Router();

/**
 * @openapi
 * /flight/v1/purchase:
 *   post:
 *     summary: Purchase flight tickets
 *     description: Process a flight purchase with multiple flights, user information, and payment token
 *     tags:
 *       - Flight Purchase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flights
 *               - userId
 *               - paymentToken
 *             properties:
 *               flights:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - orderOfFlight
 *                     - flightNumber
 *                     - seatClass
 *                   properties:
 *                     orderOfFlight:
 *                       type: number
 *                       description: Order of the flight in the itinerary
 *                       example: 1
 *                     flightNumber:
 *                       type: string
 *                       description: Unique flight identifier
 *                       example: "AA123"
 *                     seatClass:
 *                       type: string
 *                       enum: [basic, business, first]
 *                       description: Class of seat to purchase
 *                       example: "business"
 *               userId:
 *                 type: string
 *                 description: Unique user identifier
 *                 example: "user123"
 *               paymentToken:
 *                 type: string
 *                 description: Payment authorization token
 *                 example: "tok_visa_1234567890"
 *     responses:
 *       200:
 *         description: Purchase processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [APPROVED, DECLINED]
 *                   description: Purchase approval status
 *                   example: "APPROVED"
 *                 finalPrice:
 *                   type: number
 *                   description: Total price for all flights
 *                   example: 1234.56
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
router.post('/v1/purchase', async (req: Request, res: Response) => {
  try {
    const request: FlightPurchaseAggregate = req.body;
    const flightPurchase = new FlightPurchase(
      new UserRepository(),
      new FlightRepository(),
      new TariffGateway(),
      new PaymentFactory(
        new BankPaymentMethod(),
        new CreditPaymentMethod()
      )
    );
    const purchaseResult = await flightPurchase.purchase(request);

    res.status(200).json(purchaseResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
