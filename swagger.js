
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Creative Motion Agency API',
      version: '1.0.0',
      description: 'API documentation for the Creative Motion Agency backend.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Service: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            category: { type: 'string' },
          },
        },
        Portfolio: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            serviceType: { type: 'string', description: 'ObjectID of the service' },
            imageUrl: { type: 'string' },
            videoUrl: { type: 'string' },
          },
        },
        Testimonial: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            role: { type: 'string' },
            feedback: { type: 'string' },
            rating: { type: 'number' },
            imageUrl: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
};

export default swaggerDocs;
