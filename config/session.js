import expressSession from 'express-session';
import prisma from '../prisma/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const session = expressSession({
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 60 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: false,
  },
});

export default session;
