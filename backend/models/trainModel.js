import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stations: { type: Array, required: true },
    times: { type: Array, required: true },
    numReviews: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    tickets: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model('Train', trainSchema);
export default Train;
