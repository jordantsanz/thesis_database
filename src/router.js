import { Router } from 'express';
import * as ThesisController from './controllers/thesis_controller';

const router = Router();

router.route('/newSubject')
  .post(ThesisController.createNewSubject);

router.route('/affect')
  .put(ThesisController.addAffectPercent);

router.route('/accuracy')
  .put(ThesisController.addAccuracyPercent);

router.route('/error')
  .put(ThesisController.addErrorPercent);

router.route('/newattempt')
  .post(ThesisController.addNewAttempt);

export default router;
