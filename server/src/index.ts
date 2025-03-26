import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { PORT } from './config/env';
import { authMiddleware } from './middlewares/auth.middleware';
import { errorMiddleware, ErrorResponse } from './middlewares/error.middleware';
import managerRoutes from './routes/manager.route';
import tenantRoutes from './routes/tenant.route';
import propertyRoutes from './routes/property.route';
import leaseRoutes from './routes/lease.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Healthy Server');
});

app.use('/managers', authMiddleware(['manager']), managerRoutes);
app.use('/tenants', authMiddleware(['tenant']), tenantRoutes);
app.use('/properties', propertyRoutes);
app.use('/lease', leaseRoutes);

app.all('*', () => {
  throw new ErrorResponse('Resource not found', 404);
});

app.use(errorMiddleware);
app.listen(PORT, () =>
  console.log(`server started on http://localhost:${PORT}`)
);
