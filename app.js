var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
var app = express();

dotenv.config({path:'config.env'})
const DB = process.env.DB.replace('<pwd>',process.env.DB_PASSWORD)
mongoose.connect(DB)
    .then((res)=>console.log('連上伺服器'))
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',postsRouter)

module.exports = app;
