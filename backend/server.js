import express from 'express';
import data from './data.js';

const app = express();

const port = process.env.PORT || 5000;

app.get('/api/trains', (req, res) => {
  res.send(data.trains);
});

app.get('/api/trains/slug/:slug', (req, res) => {
  const train = data.trains.find((x) => x.slug === req.params.slug);
  if (train) {
    res.send(train);
  } else {
    res.status(404).send({ message: 'Train Not Found' });
  }
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
