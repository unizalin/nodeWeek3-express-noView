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
const session = require('express-session');
const passport = require('passport');
var app = express();
require('./service/auth')
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


// app.use(session({secret: 'googleAuth'}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',postsRouter)

// app.post('/auth/google', async (req, res) => {
 
//   //引入官方的套件
//   const { OAuth2Client } = require('google-auth-library')
//   const CLIENT_ID =
//   '妳申請的client_Id放在這'
//   const client = new OAuth2Client(CLIENT_ID)
//   const token = req.body.id_token
  
//   //將token和client_Id放入參數一起去做驗證
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: CLIENT_ID
//   })
  
//   //拿到的ticket就是換回來的使用者資料
//   console.log(ticket)
  
//   //以下就個人需求看要拿資料做哪些使用
//   //ex 使用者資訊存入資料庫，把資料存到 session內 等等
// })

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});




module.exports = app;
