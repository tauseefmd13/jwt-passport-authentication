import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import jwtConfig from "../config/jwt.js";
import User from "../models/User.js";

export const register = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	//check user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		return res
			.status(409)
			.json({ success: false, message: "The email has already been taken." });
	}

	//hash the password
	let hashedPassword;
	if (password) {
		const saltRounds = 10;
		const salt = await bcrypt.genSaltSync(saltRounds);
		hashedPassword = await bcrypt.hashSync(password, salt);
	}

	const user = await User({
		first_name,
		last_name,
		email,
		password: hashedPassword,
	});

	try {
		await user.save();

		//create jwt token
		const payload = {
			_id: user._id,
			email: user.email,
		};
		const token = jwt.sign(payload, jwtConfig.secret, {
			expiresIn: jwtConfig.ttl,
		});

		return res.status(201).json({
			success: true,
			message: "Registered successfully.",
			data: { user, token },
		});
	} catch (err) {
		return res
			.status(422)
			.json({ success: false, message: "Validation failed.", data: err });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user || !user.comparePassword(password)) {
		return res.status(404).json({
			success: false,
			message: "These credentials do not match our records.",
		});
	}

	//create jwt token
	const payload = {
		_id: user._id,
		email: user.email,
	};
	const token = jwt.sign(payload, jwtConfig.secret, {
		expiresIn: jwtConfig.ttl,
	});

	return res.json({
		success: true,
		message: "Logged in successfully.",
		data: { user, token },
	});
};
