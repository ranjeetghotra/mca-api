import * as mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	'user': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'orderId': {
		type: String,
	},
	'address': {
		type: Schema.Types.ObjectId,
		ref: 'Address'
	},
	'products': {
		type: [{
			product: {
				type: Schema.Types.ObjectId,
				ref: 'Product'
			},
			price: Number,
			quantity: Number
		}]
	},
	'shipping': Number,
	'subTotal': Number,
	'payment': {
		type: String
	},
	'status': {
		type: String,
		default: 'Pending'
	},
	'createdAt': {
		type: Date,
		default: Date
	}
}).plugin(toJson);

export = mongoose.model('Order', OrderSchema);
