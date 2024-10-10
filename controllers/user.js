const User = require('../models/user');
const { z } = require('zod');
const { signUpSchema } = require('../lib/validation/user');

const signUp = async (req, res) => {
    try {
        const { fullName, username, email, password } = signUpSchema.parse(req.body);
        signUpSchema.parse({ fullName, username, email, password });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signUp,
};
