import express from 'express';
import Train from '../models/trainModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Train.remove({});
  const createdTrains = await Train.insertMany(data.trains);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

  res.send({ createdTrains, createdUsers });
});

export default seedRouter;
