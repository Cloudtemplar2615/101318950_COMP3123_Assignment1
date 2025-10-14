import { Router } from 'express';
import {
  listEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee
} from '../controllers/emp.controller.js';
import {
  createEmpRules, updateEmpRules, getEmpByIdRules, deleteEmpRules
} from '../validators/employee.validators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/employees', listEmployees);
router.post('/employees', createEmpRules, validate, createEmployee);
router.get('/employees/:eid', getEmpByIdRules, validate, getEmployeeById);
router.put('/employees/:eid', updateEmpRules, validate, updateEmployee);
router.delete('/employees', deleteEmpRules, validate, deleteEmployee);

export default router;
