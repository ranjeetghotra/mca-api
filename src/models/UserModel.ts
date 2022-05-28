import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const UserSchema = new Schema({
	'firstName': String,
	'lastName': String,
	'email': String,
	'countryCode': String,
	'phone': String,
	'role': {
		type: Number,
		default: 1
	},
	'verified': {
		type: Boolean,
		default: false
	},
	'active': {
		type: Boolean,
		default: true
	},
	'createdAt': {
		type: Date,
		default: Date
	},
	hash: String,
	salt: String,
}).plugin(toJson);

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");
	return true;
};

UserSchema.methods.validPassword = function (password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");
	return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign(
		{
			id: this._id,
			role: this.role || undefined,
			firstName: this.firstName,
			lastName: this.lastName,
		},
		process.env.SECRET,
		{
			expiresIn: Math.round(expiry.getTime() / 1000),
		}
	);
};
UserSchema.methods.profile = function () {
	return {
		id: this.id,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		countryCode: this.countryCode,
		phone: this.phone,
		role: this.role,
		verified: this.verified,
		active: this.active,
		createdAt: this.createdAt,
	}
};

export = model('User', UserSchema);
