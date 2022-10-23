import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import trainRouter from './routes/trainRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/trains', trainRouter);

const port = process.env.PORT || 5000;

// app.get('/api/trains', (req, res) => {
//   res.send(data.trains);
// });

app.get('/api/stations', (req, res) => {
  res.send(data.stations);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
