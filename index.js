var express = require('express');
var app = express();
var router=require('./router/index');
var config=require('./config/base');
var path=require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var bodyParser=require("body-parser"); 

// set the tempelate dir
app.set('views', path.join(__dirname, 'views'));
// set ejs as the tempelate
app.set('view engine', 'ejs');
//set the static path
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  name: 'todos',// 设置 cookie 中保存 session id 的字段名称
  secret: 'todos',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: 2592000000// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url:'mongodb://localhost:27017/ycNej'// mongodb 地址
  }),
  resave: true, 
  saveUninitialized: true
}));
app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
//make router/index control all of the routers
router(app);

app.listen(config.port,function(){
	console.log(`the port ${config.port} has been listened`);
});