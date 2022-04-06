/* eslint-disable camelcase */
import Subject from '../models/subject_model';
import { NUMBER_OF_DATA_OBJECTS } from '../constants';
// import Attempt from '../models/attempt_model';

// needs: id of subject
export const createNewSubject = (req, res) => {
  const subject = new Subject();
  subject.id = req.body.id;
  subject.isControl = req.body.isControl;
  subject.finalOverallTimeLeftMin = 0;
  subject.finalOverallTimeLeftSec = 0;
  subject.paymentString = '';
  subject.finalTaskTimeSpentMin = 0;
  subject.finalTaskTimeSpentSec = 0;
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

export const addFinalStats = (req, res) => {
  console.log('add final stats called');
  Subject.findOne({ id: req.body.id }).then((subject) => {
    console.log('id: ', req.body.id, 'rest: ', req.body);
    console.log('subejct: ', subject);
    subject.finalOverallTimeLeftMin = req.body.timerStats.minutes;
    console.log('set min 1');
    subject.finalOverallTimeLeftSec = req.body.timerStats.seconds;
    console.log('set sec 1');
    subject.finalTaskTimeSpentMin = req.body.stopwatchStats.minutes;
    console.log('set min2');
    subject.finalTaskTimeSpentSec = req.body.stopwatchStats.seconds;
    console.log('set sec 2');
    subject.paymentString = req.body.string;
    console.log('subject after updating: ');

    Subject.updateOne({
      id: req.body.id,
      finalOverallTimeLeftMin: subject.finalOverallTimeLeftMin,
      finalOverallTimeLeftSec: subject.finalOverallTimeLeftSec,
      finalTaskTimeSpentMin: subject.finalTaskTimeSpentMin,
      finalTaskTimeSpentSec: subject.finalTaskTimeSpentSec,
    }).then((nextRes) => {
      console.log('after updat one)');
      res.send(nextRes);
    });
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
    }
    subject.results[req.body.lesson_id].attempts[req.body.attempt].errorPercent = req.body.percent;
    Subject.updateOne({ id: req.body.id, results: subject.results }).then((nextRes) => {
      res.send(nextRes);
    });
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};

export const addNewAttempt = (req, res) => {
  console.log('req body in add new attempt: ', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (req.body.attempt == null || req.body.attempt === undefined) {
      res.sendStatus(501);
    }
    if (subject === undefined || subject == null) {
      res.sendStatus(502);
    }
    if (req.body.lesson_id == null || req.body.lesson_id === undefined) {
      res.sendStatus(503);
    }

    const newAttempt = {
      accuracyPercent: -1,
      errorPercent: -1,
      errorArray: [],
      accuracyArray: [],
      affectPercent: -1,
      bpm: req.body.bpm,
    };

    console.log(subject, 'subject');
    console.log(subject.results);

    subject.results[req.body.lesson_id].attempts.push(newAttempt);
    Subject.updateOne({ id: req.body.id }, subject).then((s) => {
      res.send(s);
    });
  })

    .catch((error) => {
      console.log('some error happend while making a new attempt');
      res.sendStatus(505);
    });
};

// needs: id of subject, lesson number, percent: percent of data
export const addAccuracyAndErrorPercent = (req, res) => {
  console.log('req body in accuracy percent', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    }
    subject.results[req.body.lesson_id].attempts[req.body.attempt].accuracyPercent = req.body.percent;
    subject.results[req.body.lesson_id].attempts[req.body.attempt].errorPercent = req.body.errorPercent;
    subject.results[req.body.lesson_id].attempts[req.body.attempt].errorArray = req.body.errorArray;
    subject.results[req.body.lesson_id].attempts[req.body.attempt].accuracyArray = req.body.accuracyArray;
    // } else {
    //   if (subject.results[req.body.lesson_id].attempts.length === req.body.attempt) {
    //     subject.results[req.body.lesson_id].attempts.push({
    //       accuracyPercent: req.body.percent,
    //     });
    //   } else {
    //     subject.results[req.body.lesson_id].attempts[req.body.attempt].accuracyPercent = req.body.percent;
    //   }
    Subject.updateOne({ id: req.body.id, results: subject.results }).then((nextRes) => {
      res.send(nextRes);
    });
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};
