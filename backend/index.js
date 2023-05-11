require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const errorMiddleware = require('./middleware/error-middleware');
const { corsOptions } = require('./config/corsOptions');

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/api', postRouter);

app.use(errorMiddleware);

app.listen(3000, () => console.log('сервер запущен'));
