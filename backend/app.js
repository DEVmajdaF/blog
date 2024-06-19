var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const categorieRouter = require('./routes/categorieRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const { isAuthorized, isAuthenticated, VerifyToken } = require('./middleware/auth/authMiddleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});
app.use(
    cors({
        origin: ["http://localhost:3001"],
        credentials: true,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',isAuthenticated, categorieRouter);
app.use('/user',authRouter);
app.use('/comment',isAuthenticated,commentRouter);
app.use('/post',isAuthenticated,postRouter);

module.exports = app;
