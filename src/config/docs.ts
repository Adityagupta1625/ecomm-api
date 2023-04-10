import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Savishi API',
      version: '1.0.0',
      description: 'API documentation for your Node.js project'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: [
    './src/routes/App/notsignedIn/Auth.ts',
    './src/routes/App/notsignedIn/Product.ts',
    './src/routes/App/notsignedIn/ProductCategory.ts',
    './src/routes/App/signedIn/Cart.ts',
    './src/routes/App/signedIn/CartItems.ts',
    './src/routes/App/signedIn/Order.ts',
    './src/routes/App/signedIn/OrderItems.ts',
    './src/routes/App/signedIn/Payment.ts',
    './src/routes/App/signedIn/User.ts',
    './src/routes/App/signedIn/UserAddress.ts'
  ] // replace this with the path to your API routes
};

const specs = swaggerJsdoc(options);

export default specs;