import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import productsRouter from "./routes/productsRouter.js";
import { connectDatabase } from "./config/db.js";
import cors from "cors";

dotenv.config();
connectDatabase();
const app = express();

app.use(
  cors({
    // origin: 'http://localhost:3000', // allow frontend
    origin: [
      // allow frontend
      "http://localhost:3000",
      // "https://mynextjsproject.netlify.app",
    ],
    credentials: true,
  })
);

// const allowedOrigins = [
//   'http://localhost:3000',               // Dev frontend
//   'https://your-frontend.vercel.app'     // Replace with your actual frontend domain
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like curl or Postman) or matching allowed list
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
