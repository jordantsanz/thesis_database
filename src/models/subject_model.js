import Mongoose, { Schema } from 'mongoose';

const SubjectModel = new Schema({
  id: String,
  isControl: Boolean,
  finalOverallTimeLeft: Object,
  finalTaskTimeSpent: Object,
  paymentString: String,
  results: [Object],
});

const Subject = Mongoose.model('Subject', SubjectModel);

export default Subject;
