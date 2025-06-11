const { signUpSchema, signInSchema } = require("../middlewares/auth-validator.middleware");
const { hashing, hashValidation } = require("../utils/hashing.util");
const { generateAccessToken } = require("../middlewares/jwt-token");
const User = require('../models/user');


const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const { error } = signUpSchema.validate({ username, email, password });
    if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
    }

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ status: false, message: "Email already registered" });
        }

        const hashedPassword = await hashing(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        return res.status(201).json({ status: true, message: "User created successfully" });

    } catch (err) {
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const { error } = signInSchema.validate({ email, password });
    if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ status: false, message: "Invalid credentials" });
    }

    const validPassword = await hashValidation(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ status: false, message: "Invalid password" });
    }

    const token = generateAccessToken(user.email);
    return res.status(200).json({ status: true, token });
};

module.exports = { signUp, signIn };
