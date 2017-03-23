import Question from '../models/question.model';

function loadQuestion(req, res, next, id) {
  Question.get(id)
    .then((question) => {
      req.question = question; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function loadAnswer(req, res, next, id) {
  Question.get(id)
    .then((question) => {
			req.answer = req.question.answers.id(id);
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get questions collection
 */

function getQuestions(req, res, next){
	Question.find({})
				.sort({createdAt: -1})
				.exec()
				.then(questions => res.json(questions))
				.catch(e => next(e))
}

function create(req, res, next){
	let question = new Question(req.body);
  question.answers = question.answers.sort(Question.sortAnswers)
  question.save(function(err, question){
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});
}

// GET /questions/:id
// Route for specific questions
// router.get("/:qID", function(req, res, next){
// 	res.json(req.question);
// });

function get(req,res){
  return res.json(req.question)
}

export default { create, loadAnswer, loadQuestion, getQuestions, get };
