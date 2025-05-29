import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import proposalRoutes from './routes/proposalRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import negotiationRoutes from './routes/negotiationRoutes';
import boostRoutes from './routes/boostRoutes';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://scalex-invest.vercel.app',
  credentials: true,
}));

// log every incoming request for debugging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.method, req.path);
  next();
});

app.use('/auth', authRoutes);
app.use(proposalRoutes); // /users/:id/proposals
app.use('/users', userRoutes); // for tests
app.use('/admin', adminRoutes);
app.use('/posts', postRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/negotiations', negotiationRoutes);
app.use('/boosts', boostRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = Number(process.env.PORT) || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
