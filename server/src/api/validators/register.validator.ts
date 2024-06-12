import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Not a valid e-mail address'),
  body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Name length should be from 5 to 100 characters`),
  body('surname')
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Surname length should be from 5 to 100 characters`),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ max: 50 })
    .isStrongPassword({
      minLength: 5,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    }),
];
