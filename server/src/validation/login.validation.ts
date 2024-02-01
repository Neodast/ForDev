import { body } from 'express-validator';

export const accountLoginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Not a valid e-mail address'),
  body('password')
    .trim()
    .notEmpty()
    .isLength({max: 50})
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage('Not a valid password'),
];