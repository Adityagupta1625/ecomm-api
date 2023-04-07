import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import openapiSpecification from './config/docs';

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API is running on /api' });
});

app.use('/app', require('./routes/App').default);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
//   // @ts-ignore
//   if (err && err.errorCode) {
//     // @ts-ignore
//     res.status(err.errorCode).json(err.message);
//   } else if (err) {
//     res.status(500).json(err.message);
//   }
// });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});