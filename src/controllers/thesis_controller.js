/* eslint-disable camelcase */
import Subject from '../models/subject_model';
import { NUMBER_OF_DATA_OBJECTS } from '../constants';
// import Attempt from '../models/attempt_model';

// needs: id of subject
export const createNewSubject = (req, res) => {
  console.log('req is control: ', req.body);
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
  subject.save().then((result) => {
    console.log(result, 'result');
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
    subject.finalOverallTimeLeftMin = req.body.timerStats.minutes;
    subject.finalOverallTimeLeftSec = req.body.timerStats.seconds;

    subject.finalTaskTimeSpentMin = req.body.stopwatchStats.minutes;
    subject.finalTaskTimeSpentSec = req.body.stopwatchStats.seconds;
    subject.paymentString = req.body.string;

    Subject.updateOne({
      id: req.body.id,
      isControl: subject.isControl,
      finalOverallTimeLeftMin: subject.finalOverallTimeLeftMin,
      finalOverallTimeLeftSec: subject.finalOverallTimeLeftSec,
      finalTaskTimeSpentMin: subject.finalTaskTimeSpentMin,
      finalTaskTimeSpentSec: subject.finalTaskTimeSpentSec,
      paymentString: subject.paymentString,
    }).then((nextRes) => {
      res.send(nextRes);
    });
  });
};

// needs: id of subject, lesson number, any data to add
export const addAffectPercent = (req, res) => {
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    } else {
      subject.results[req.body.lesson_id].attempts[req.body.attempt].affectPercent = req.body.percent;
      subject.results[req.body.lesson_id].attempts[req.body.attempt].affectDataframe = req.body.dataframe;
    }

    Subject.updateOne({ id: req.body.id, results: subject.results }).then((nextRes) => {
      console.log('next res: ', nextRes);
      res.send(nextRes);
    });
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};

// needs: id of subject, lesson number, any data to add
export const addErrorPercent = (req, res) => {
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

export const submitAttempt = (req, res) => {
  console.log('req body: ', req.body);
  Subject.findOne({ id: req.body.id }).then((subject) => {
    if (subject == null) {
      console.log('no subject found');
    }
    const attempt = {
      lesson_id: req.body.lesson_id,
      attemptNumber: req.body.attempt,
      accuracyPercent: req.body.accuracyPercent,
      accuracyArray: req.body.accuracyArray,
      errorPercent: req.body.errorPercent,
      errorArray: req.body.errorArray,
      affectPercent: req.body.affectPercent,
      affectDataframe: req.body.affectDataframe,
    };
    subject.results.push(attempt);
    Subject.updateOne({ id: req.body.id }, subject).then((nextRes) => {
      console.log(subject);
      console.log(nextRes);
      res.send(nextRes);
    });
  })

    .catch((error) => {
      console.log('error: ', error);
      res.send(501);
    });
};

export const addNewAttempt = (req, res) => {
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
      affectDataframe: {},
      bpm: req.body.bpm,
    };
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
    Subject.updateOne({ id: req.body.id, results: subject.results, isControl: subject.isControl }).then((nextRes) => {
      res.send(nextRes);
    });
  })
    .catch((error) => {
      console.log('error adding affect percent', error);
      res.send(500);
    });
};
