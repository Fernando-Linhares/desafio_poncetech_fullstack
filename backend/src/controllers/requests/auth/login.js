import { checkSchema } from 'express-validator';

const login_request = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email address'
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
});

export { login_request }