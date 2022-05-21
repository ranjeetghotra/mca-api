import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Schema, model } from 'mongoose';

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
	}
});

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
			fname: this.fname,
			permissions: this.permissions || undefined,
			merchant: this.merchant || undefined
		},
		process.env.SECRET,
		{
			expiresIn: Math.round(expiry.getTime() / 1000),
		}
	);
};

export = model('User', UserSchema);
