import { Router } from 'express';
import * as ThesisController from './controllers/thesis_controller';
import signS3 from './services/s3';
import signs3new from './services/news3';

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

router.get('/sign-s3', signS3);
router.get('/signs3', signs3new);

export default router;
