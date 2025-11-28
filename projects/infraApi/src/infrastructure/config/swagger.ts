import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Buy API',
      version: '1.0.0',
      description: 'API for buying tickets',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/infrastructure/routes/*.ts', './src/infrastructure/app.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
