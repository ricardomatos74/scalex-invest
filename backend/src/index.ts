import express from 'express';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import proposalRoutes from './routes/proposalRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use(proposalRoutes); // /users/:id/proposals
app.use('/users', userRoutes); // for tests
app.use('/admin', adminRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = Number(process.env.PORT) || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
