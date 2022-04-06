import Mongoose, { Schema } from 'mongoose';

const SubjectModel = new Schema({
  id: String,
  isControl: Boolean,
  finalOverallTimeLeftMin: Number,
  finalOverallTimeLeftSec: Number,
  finalTaskTimeSpentMin: Number,
  finalTaskTimeSpentSec: Number,
  paymentString: String,
  results: [Object],
});

const Subject = Mongoose.model('Subject', SubjectModel);

export default Subject;
