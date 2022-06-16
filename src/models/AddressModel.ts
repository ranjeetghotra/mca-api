import * as mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'name' : String,
	'phone' : String,
	'address' : String,
	'street' : String,
	'locality' : String,
	'pincode' : String,
	'deleted' : {
		type: Boolean,
		default: false,
	},
	'createdAt': {
		type: Date,
		default: Date
	}
}).plugin(toJson);

export = mongoose.model('Address', AddressSchema);
