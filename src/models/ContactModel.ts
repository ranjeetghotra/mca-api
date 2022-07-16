import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import toJson from '@meanie/mongoose-to-json';

const ContactSchema = new Schema({
	'user': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'name': String,
	'email': String,
	'subject': String,
	'message': String,
	'createdAt': {
		type: Date,
		default: Date
	}
}).plugin(toJson);

export = mongoose.model('Contact', ContactSchema);
