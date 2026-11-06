import express from 'express';
import session from './config/session.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import prisma from './prisma/prisma.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(session);

// passport

import bcrypt from 'bcryptjs';
import mainRouter from './routers/mainRouter.js';

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (username, password, done) => {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false);
      }

      const hashedPassword = user.password;

      const isCorrect = await bcrypt.compare(password, hashedPassword);

      if (isCorrect) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return done(null, user);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.use(mainRouter);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Application is running on port ${PORT}`);
});
