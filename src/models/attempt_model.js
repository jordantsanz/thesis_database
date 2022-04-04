import mongoose, { Schema } from 'mongoose';

const AttemptModel = new Schema({
  attemptNum: Number,
  errorPercent: Number,
  accuracyPercent: Number,
  affectPercent: Number,
});

const Attempt = mongoose.model('RhythmData', AttemptModel);

export default Attempt;
