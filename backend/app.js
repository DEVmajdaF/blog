var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');

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
app.use('/user',authRouter);

module.exports = app;
