import express from 'express';
//import validate from 'express-validation';
//import paramValidation from '../../config/param-validation';
import questionCtrl from '../controllers/question.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(questionCtrl.getQuestions)

  /** POST /api/users - Create new user */
  .post(questionCtrl.create);

router.route('/:qID')
  /** GET /api/users/:userId - Get user */
  .get(questionCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(questionCtrl.update)
//
//   /** DELETE /api/users/:userId - Delete user */
//   .delete(questionCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('qID', questionCtrl.loadQuestion);
router.param('aID', questionCtrl.loadAnswer);

export default router;
