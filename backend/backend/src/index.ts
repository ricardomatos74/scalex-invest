import express from 'express';
import { PrismaClient } from '@prisma/client';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();
const prisma = new PrismaClient();

// Middleware para parsear JSON
app.use(express.json());

// Rotas públicas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Rotas protegidas (painel admin)
app.use('/admin', adminRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
