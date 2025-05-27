import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';

const app = express();
const prisma = new PrismaClient();

app.u
  app.use('/users', userRoutes);se(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example users endpoint
app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
