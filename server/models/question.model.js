//import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const sortAnswers = (a, b) => {
	//- negative a before b
	//0 no change
	//+ positive a after b
	if(a.votes === b.votes){
		return b.updatedAt - a.updatedAt;
	}
	return b.votes - a.votes;
}

const AnswerSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	votes: {type: Number, default:0}
});

const QuestionSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	answers: [AnswerSchema]
});

AnswerSchema.method("update", (updates, callback) => {
Object.assign(this, updates, {updatedAt: new Date()});
this.parent().save(callback);
});

AnswerSchema.method("vote", (vote, callback) => {
if(vote === "up") {
  this.votes += 1;
} else {
  this.votes -= 1;
}
this.parent().save(callback);
});


// QuestionSchema.pre("save", (err, next)=>{
// 	console.log(String(this))
// 	if (err) return new APIError('Undefinedddd!', httpStatus.NOT_FOUND)
// 	this.answers.sort(sortAnswers);
// });


QuestionSchema.statics = {
  get(id) {
    return this.findById(id)
			.exec()
			.then((question) => {
				if (question) {
					return question;
				}
				const err = new APIError('No such question exists, sorry!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
      });
  },
	sortAnswers(a, b) {
		//- negative a before b
		//0 no change
		//+ positive a after b
		if(a.votes === b.votes){
			return b.updatedAt - a.updatedAt;
		}
		return b.votes - a.votes;
	}
}

export default mongoose.model("Question", QuestionSchema);
