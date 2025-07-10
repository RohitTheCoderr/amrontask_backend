import express from "express"
import dotenv from 'dotenv'
import userRoutes from "./routes/userRouter.js";
import { connectDatabase } from './config/db.js';

dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api/products', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
