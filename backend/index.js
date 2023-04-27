require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Users } = require('./models');
const router = require('./routers/user');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.get('/', async (req, res) => {
  const user = await Users.findOne({
    while: { name: 'Sasha' },
    include: 'token',
  });

  console.log(user.token);
  res.json(user);
});

app.listen(3000, () => console.log('сервер запущен'));
