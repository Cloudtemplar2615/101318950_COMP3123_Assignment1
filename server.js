import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
import userRoutes from './src/routes/user.routes.js';
import empRoutes from './src/routes/emp.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ status: 'OK' }));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});

export default app;