require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Users } = require('./models');
const router = require('./routers/user');
const errorMiddleware = require('./middleware/error-middleware');
const authMiddleware = require('./middleware/auth-middleware');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.use(errorMiddleware);


app.listen(3000, () => console.log('сервер запущен'));
