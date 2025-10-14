import { body, param, query } from 'express-validator';

export const createEmpRules = [
  body('first_name').trim().notEmpty(),
  body('last_name').trim().notEmpty(),
  body('email').isEmail(),
  body('position').trim().notEmpty(),
  body('salary').isNumeric().toFloat(),
  body('date_of_joining').isISO8601(),
  body('department').trim().notEmpty()
];

export const updateEmpRules = [
  param('eid').isMongoId(),
  body('email').optional().isEmail(),
  body('salary').optional().isNumeric().toFloat(),
  body('date_of_joining').optional().isISO8601()
];

export const getEmpByIdRules = [ param('eid').isMongoId() ];
export const deleteEmpRules = [ query('eid').isMongoId() ];
