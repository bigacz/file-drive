import passport from 'passport';
import { registerValidators } from './validators.js';
import { matchedData, validationResult } from 'express-validator';
import prisma from '../prisma/prisma.js';
import bcrypt from 'bcryptjs';

const getLogin = (req, res) => {
  res.render('login');
};

const postLogin = [passport.authenticate('local'), (req, res) => {}];

const getRegister = (req, res) => {
  res.render('register');
};

const postRegister = [
  ...registerValidators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { email, password } = matchedData(req);

    const existingUser = await prisma.user.findUnique({
      where: { username: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json([{ msg: 'User with this email already exists.' }]);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = await prisma.user.create({
      data: {
        username: email,
        password: hashedPassword,
      },
    });

    return res.status(200).send('Account created');
  },
];

export default { getLogin, postLogin, getRegister, postRegister };
