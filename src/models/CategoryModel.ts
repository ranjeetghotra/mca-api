import * as mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	'name': String,
	'image': String,
	'active': {
		type: Boolean,
		default: true
	},
	'createdAt': {
		type: Date,
		default: Date
	}
}).plugin(toJson);

export = mongoose.model('Category', CategorySchema);
