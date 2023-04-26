const express = require('express');
require('dotenv').config();
const { Users } = require('./models');
cors = require('cors');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const user = await Users.findOne({ while: { name: 'Sasha' } });

  console.log(user);
  res.json(user);
});

app.listen(3000, () => console.log('сервер запущен'));
