import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ status: false, message: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  return res.status(201).json({
    message: 'User created successfully.',
    user_id: String(user._id)
  });
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne(email ? { email } : { username });
  if (!user) return res.status(401).json({ status: false, message: 'Invalid Username and password' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ status: false, message: 'Invalid Username and password' });

  const token = jwt.sign(
    { sub: String(user._id), username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return res.status(200).json({ message: 'Login successful.', jwt_token: token });
};
