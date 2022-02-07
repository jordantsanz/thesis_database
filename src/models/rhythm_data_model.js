import mongoose, { Schema } from 'mongoose';

const RhythmDataModel = new Schema({
  id: String,
  errorPercent: Number,
  accuracyPercent: Number,
  affectPercent: Number,
});

const RhythmData = mongoose.model('RhythmData', RhythmDataModel);

export default RhythmData;
