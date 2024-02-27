import { body } from 'express-validator';

export const accountRegisterValidation = [
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
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage('Not a valid password'),
  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
