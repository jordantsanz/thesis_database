import RhythmData from '../models/rhythm_data_model';
import Subject from '../models/subject_model';
import { NUMBER_OF_DATA_OBJECTS } from '../constants';

// needs: id of subject
export const createNewSubject = (req, res) => {
  const subject = new Subject();
  subject.id = req.body.id;
  subject.results = [];
  for (let i = 0; i < NUMBER_OF_DATA_OBJECTS; i += 1) {
    const data = new RhythmData();
    data.lesson_id = i;
    subject.results.push(data);
  }
  subject.save().then((result) => {
    res.send(result);
  })
    .catch((error) => {
      console.log('error creating subject:', error);
      res.status(500).send(error);
    });
};

// needs: id of subject, lesson number, any data to add
export const addAffectPercent = (req, res) => {
  Subject.find({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      const resultData = subject.results[req.body.lesson_id];
      resultData.affectPercent = req.body.percent;
      subject.save().then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent');
      res.send(500);
    });
};

// needs: id of subject, lesson number, any data to add
export const addErrorPercent = (req, res) => {
  Subject.find({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      const resultData = subject.results[req.body.lesson_id];
      resultData.errorPercent = req.body.percent;
      subject.save().then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent');
      res.send(500);
    });
};

// needs: id of subject, lesson number, percent: percent of data
export const addAccuracyPercent = (req, res) => {
  Subject.find({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      const resultData = subject.results[req.body.lesson_id];
      resultData.accuracyPercent = req.body.percent;
      subject.save().then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent');
      res.send(500);
    });
};
