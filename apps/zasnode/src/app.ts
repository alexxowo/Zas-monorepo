import express from 'express';
import jwt from 'jsonwebtoken';
import { GlobalService } from './services/GlobalContext';

import { AuthMiddleware } from './middleware/Auth';
import userRoutes from "./routes/UserRouter";
import productRoutes from "./routes/ProductRouter";
import categoryRoutes from "./routes/CategoryRouter";
import customerRoutes from "./routes/CustomerRouter";
import paymentRoutes from "./routes/PaymentRouter";
import paymentMethodRoutes from "./routes/PaymentMethodRouter";
import cors from 'cors';

const app = express();

// Middlewares
app.use((req,res,next) => {

  const token = req.headers.authorization?.replace('Bearer ', '');
  const lang = (req.headers['accept-language'] as string) || 'es';

  let userId: string | undefined;
  if(token) {
    const decoded = jwt.verify(token, process.env.JWT_PASS || 'secret') as { id: string, name: string, roles: string[] };
    userId = decoded.id;
  }

  GlobalService.run({
    token,
    langId: lang,
    userId,
    requestId: crypto.randomUUID(),
  }, next);

})

app.use(cors());
/*
app.use(cors({
  origin: ['http://localhost:3000', 'https://mi-dominio.com'], // Dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
}));
*/

app.use(express.json());
//-------------

/////////////
// Rutas base
app.use("/api/user", userRoutes);
app.use("/api/product", AuthMiddleware, productRoutes);
app.use("/api/category", AuthMiddleware, categoryRoutes);
app.use("/api/customer", AuthMiddleware, customerRoutes);
app.use("/api/payment", AuthMiddleware, paymentRoutes);
app.use("/api/paymentMethod", AuthMiddleware, paymentMethodRoutes);
//-----------

export default app;