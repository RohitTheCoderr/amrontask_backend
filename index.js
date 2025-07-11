import express from "express"
import dotenv from 'dotenv'
import userRoutes from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { connectDatabase } from './config/db.js';
import cors from 'cors';

dotenv.config();
connectDatabase();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // allow frontend
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', adminRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
