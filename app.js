import express from 'express';
import session from './config/session.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(session);

// passport

// passport

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
