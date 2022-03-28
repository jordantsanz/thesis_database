import mongoose, { Schema } from 'mongoose';

const RhythmDataModel = new Schema({
  attemptNum: Number,
  errorPercent: Number,
  accuracyPercent: Number,
  affectPercent: Number,
});

const RhythmData = mongoose.model('RhythmData', RhythmDataModel);

export default RhythmData;
