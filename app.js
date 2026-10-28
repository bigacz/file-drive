import express from 'express';

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const PORT = process.env_APPLICATION_PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log(`Application is running on port ${PORT}`);
});
