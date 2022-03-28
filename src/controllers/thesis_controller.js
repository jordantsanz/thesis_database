/* eslint-disable camelcase */
import Subject from '../models/subject_model';
import { NUMBER_OF_DATA_OBJECTS } from '../constants';

// needs: id of subject
export const createNewSubject = (req, res) => {
  const subject = new Subject();
  subject.id = req.body.id;
  subject.results = [];
  for (let i = 0; i < NUMBER_OF_DATA_OBJECTS; i += 1) {
    const data = {};
    data.lesson_id = i;
    data.attempts = [];
    subject.results.push(data);
  }
  console.log('subject to save', subject);
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
  console.log('req body in affect percent', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      const resultData = subject.results[req.body.lesson_id].attempts;
      console.log('resultData', resultData);
      if (resultData.length === req.body.attempt) {
        resultData.push({
          affectPercent: req.body.percent,
          affectDataframe: req.body.dataframe,
        });
      } else {
        resultData[req.body.attempt].affectPercent = req.body.percent;
        resultData[req.body.attempt].affectDataframe = req.body.dataframe;
      }
      subject.save().then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};

// needs: id of subject, lesson number, any data to add
export const addErrorPercent = (req, res) => {
  console.log('req body in error percent', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      if (subject.results[req.body.lesson_id].attempts.length === req.body.attempt) {
        subject.results[req.body.lesson_id].attempts.push({
          errorPercent: req.body.percent,
        });
      } else {
        subject.results[req.body.lesson_id].attempts[req.body.attempt].errorPercent = req.body.percent;
      }
      Subject.updateOne({ id: req.body.id, results: subject.results }).then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};

// needs: id of subject, lesson number, percent: percent of data
export const addAccuracyPercent = (req, res) => {
  console.log('req body in accuracy percent', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      if (subject.results[req.body.lesson_id].attempts.length === req.body.attempt) {
        subject.results[req.body.lesson_id].attempts.push({
          accuracyPercent: req.body.percent,
        });
      } else {
        subject.results[req.body.lesson_id].attempts[req.body.attempt].accuracyPercent = req.body.percent;
      }
      Subject.updateOne({ id: req.body.id, results: subject.results }).then((nextRes) => {
        res.send(nextRes);
      });
    }
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};
