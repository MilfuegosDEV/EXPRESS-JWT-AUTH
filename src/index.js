import 'dotenv/config';
import './app/config/db';
import i18n from './app/config/i18n';
import { initialSetup } from './app/libs';

import {
  acceptLanguage,
  globalErrorHandler,
  resourceNotFound,
} from './app/middlewares';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './app/routes/user.routes';
import authRoutes from './app/routes/auth.routes';
// configs

// Middlewares

const PORT = process.env.PORT || 4000;

const app = express();

// Initial setup
initialSetup();

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '50mb' }));

app.use(acceptLanguage);
app.use(i18n.init);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(resourceNotFound); // for unexisting endpoints
app.use(globalErrorHandler); // the lastest middleware

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
