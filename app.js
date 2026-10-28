import express from 'express';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

// session
import expressSession from 'express-session';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js'; // MIGHT BE WRONG IMPORT!!!!!! https://github.com/kleydon/prisma-session-store#readme
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },

    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

// session

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Application is running on port ${PORT}`);
});
