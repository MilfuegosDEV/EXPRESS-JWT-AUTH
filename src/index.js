import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/connect.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json({ limit: '50mb' }));

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
