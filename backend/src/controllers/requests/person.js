import { checkSchema } from 'express-validator';

const person_request = checkSchema({
    name: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Name should be at least 8 chars',
        },
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email address'
    },
    birth_date: {
        notEmpty: true,
        errorMessage: 'Invalid field birth_date should be a date',
    },
    active: {
        isBoolean: true,
        errorMessage: 'Invalid field active should be a boolean',
    },
});

export { person_request }