import { body } from 'express-validator';

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Not a valid e-mail address'),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('Not a valid password'),
];
