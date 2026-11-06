import passport from 'passport';
import LocalStrategy from 'passport-local';
import prisma from '../prisma/prisma.js';
import bcrypt from 'bcryptjs';

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

export default passport;
