import express from 'express';
import Train from '../models/trainModel.js';

const trainRouter = express.Router();

trainRouter.get('/', async (req, res) => {
  const trains = await Train.find();

  res.send(trains);
});

trainRouter.get('/slug/:slug', async (req, res) => {
  const train = await Train.findOne({ slug: req.params.slug });
  if (train) {
    res.send(train);
  } else {
    res.status(404).send({ message: 'Train Not Found' });
  }
});

trainRouter.get('/:id', async (req, res) => {
  const train = await Train.findById(req.params.id);
  if (train) {
    res.send(train);
  } else {
    res.status(404).send({ message: 'Train Not Found' });
  }
});

export default trainRouter;
