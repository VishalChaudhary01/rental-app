import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { PORT } from './config/env';
import { errorHandler, ErrorResponse } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Healthy Server');
});

app.all('*', () => {
  throw new ErrorResponse('Resource not found', 404);
});

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`server started on http://localhost:${PORT}`)
);
