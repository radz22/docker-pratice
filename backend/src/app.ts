import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found';
import { rateLimiter } from './middlewares/rate-limiter';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import healthRoutes from './routes/health.routes';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(rateLimiter);

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

