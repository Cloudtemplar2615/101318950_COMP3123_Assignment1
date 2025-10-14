import { body } from 'express-validator';

export const signupRules = [
  body('username').trim().notEmpty(),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 })
];

export const loginRules = [
  body('email').optional().isEmail(),
  body('username').optional().isString(),
  body('password').isLength({ min: 6 })
];
