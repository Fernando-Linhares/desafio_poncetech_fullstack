import { checkSchema } from 'express-validator';
import User from "../../../models/User.js";

const register_request = checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'Invalid username',
        }
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email address',
        custom: {
            options: async (value) => {
                let userAlready = await User.findUnique({
                    where: {
                        email: value
                    }
                });

                if (userAlready)
                    throw new Error('Email is already in use');
                
              return true;
            },
        }
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
});

export { register_request }