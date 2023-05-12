import express, {Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './config/docs';
import verifyToken from './middleware/verify';

// importing routes
import Auth from './routes/App/notsignedIn/Auth';
import Product from './routes/App/notsignedIn/Product';
import ProductCategory from './routes/App/notsignedIn/ProductCategory';
import Cart from './routes/App/signedIn/Cart';
import Order from './routes/App/signedIn/Order';
import OrderItem from './routes/App/signedIn/OrderItems';
import User from './routes/App/signedIn/User';
import UserAddress from './routes/App/signedIn/UserAddress';
import Payment from './routes/App/signedIn/Payment';
import CartItem from './routes/App/signedIn/CartItems';

const app = express();

app.use(cors());
app.use(express.json());
app.set('query parser', false);

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API is running on /api' });
});

// without authentication of user
app.use('/app/notsignedIn/Auth', Auth);
app.use('/app/notsignedIn/Product', Product);
app.use('/app/notsignedIn/ProductCategory', ProductCategory);

// with authentication of user
app.use('/app/signedIn/Cart', verifyToken, Cart);
app.use('/app/signedIn/Order', verifyToken, Order);
app.use('/app/signedIn/OrderItem', verifyToken, OrderItem);
app.use('/app/signedIn/User', verifyToken, User);
app.use('/app/signedIn/UserAddress', verifyToken, UserAddress);
app.use('/app/signedIn/Payment', verifyToken, Payment);
app.use('/app/signedIn/CartItem', verifyToken, CartItem);

// swagger docs

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});