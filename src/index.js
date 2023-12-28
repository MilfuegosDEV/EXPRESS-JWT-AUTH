import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';
import errorCallback from './middlewares/errorCallback.js';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api', router);

app.use(errorCallback);

const startServer = async () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('MongoDB connected.'))
      .catch((err) => console.log(err));

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
