import * as mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	'name': String,
	'category': {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},
	'listPrice': Number,
	'discountPrice': Number,
	'active': {
		type: Boolean,
		default: true
	},
	'description': String,
	'unitValue': Number,
	'unitType': String,
	'images': Array,
	'createdAt': {
		type: Date,
		default: Date
	}
}).plugin(toJson);

export = mongoose.model('Product', ProductSchema);
