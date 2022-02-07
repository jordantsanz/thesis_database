import Mongoose, { Schema } from 'mongoose';
import RhythmData from './rhythm_data_model';

const SubjectModel = new Schema({
  id: String,
  results: [RhythmData.schema],
});

const Subject = Mongoose.model('Lesson', SubjectModel);

export default Subject;
