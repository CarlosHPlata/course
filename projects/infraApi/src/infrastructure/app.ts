import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import healthRouter from './routes/health';
import flightPurchaseRouter from './routes/FlightPurchase';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/health', healthRouter);
app.use('/flight', flightPurchaseRouter);

export default app;
