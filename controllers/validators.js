import { body, query } from 'express-validator';

const loginValidators = [];

const registerValidators = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email can't be empty'`)
    .isEmail()
    .withMessage('Email must be a valid email')
    .isLength({ min: 4, max: 40 })
    .withMessage('Email must be between 4 and 40 characters')
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password can't be empty'`)
    .isLength({ min: 10, max: 50 })
    .withMessage('Password must be between 10 and 50 characters'),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      } else {
        false;
      }
    })
    .withMessage(`Passwords don't match`)
    .escape(),
];

const getIndexValidators = [
  query('folder')
    .isString()
    .withMessage('Folder must be a string')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Folder must be a string of a maximal 255 characters'),
];

const postIndexValidators = [
  query('folder')
    .isString()
    .withMessage('Folder must be a string')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Folder must be a string of a maximal 255 characters')
    .escape(),
];

export {
  loginValidators,
  registerValidators,
  getIndexValidators,
  postIndexValidators,
};
