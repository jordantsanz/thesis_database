import { Router } from 'express';
import * as ThesisController from './controllers/thesis_controller';

const router = Router();

router.route('/newSubject')
  .post(ThesisController.createNewSubject);

router.route('/affect')
  .put(ThesisController.addAffectPercent);

router.route('/percents')
  .put(ThesisController.addAccuracyAndErrorPercent);

router.route('/error')
  .put(ThesisController.addErrorPercent);

router.route('/newattempt')
  .post(ThesisController.addNewAttempt);

router.route('/final')
  .put(ThesisController.addFinalStats);

export default router;
