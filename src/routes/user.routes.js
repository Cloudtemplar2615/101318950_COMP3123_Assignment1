import { Router } from 'express';
import { signup, login } from '../controllers/user.controller.js';
import { signupRules, loginRules } from '../validators/user.validators.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.post('/signup', signupRules, validate, signup);
router.post('/login',  loginRules,  validate, login);

export default router;
