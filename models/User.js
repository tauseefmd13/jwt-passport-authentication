import bcrypt from "bcrypt";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: ["The first name field is required."],
			max: 255,
		},
		last_name: {
			type: String,
			required: ["The last name field is required."],
			max: 255,
		},
		email: {
			type: String,
			required: ["The email field is required."],
			unique: true,
			max: 255,
		},
		email_verified_at: { type: Date, default: null },
		password: {
			type: String,
			required: ["The password field is required."],
			min: 8,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

export default new mongoose.model("User", userSchema);
