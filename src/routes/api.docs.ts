import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Luna Marketplace API Docs',
      version: '1.0.0',
      description: '',
    },
  },
  // swaggerDefinition,
  apis: ['./specs/api.yaml'],
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));


export default router;
