import { query } from 'express-validator';

const getFolderValidators = [
  query('path')
    .isString()
    .withMessage('Path must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Path must be a string of a maximal 255 characters'),
];

const postFolderValidators = [
  query('path')
    .isString()
    .withMessage('Path must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Path must be a string of a maximal 255 characters')
    .escape(),
];

export { getFolderValidators, postFolderValidators };
