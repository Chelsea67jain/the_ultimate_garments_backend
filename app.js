var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
const Razorpay = require('razorpay');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productsRouter = require('./routes/products');
var sizeRouter = require('./routes/size');
var colorsRouter = require('./routes/colors');
var adminRouter = require('./routes/admin');
var userInterfaceRouter = require('./routes/userinterface');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/products', productsRouter);
app.use('/size', sizeRouter);
app.use('/color', colorsRouter);
app.use('/admin', adminRouter);
app.use('/userinterface', userInterfaceRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const razor = new Razorpay({
  key_id: 'rzp_test_bseICPiYx3qOcO',
  key_secret: 'vCJfQeXZpnDRBEMto87aL6bM',
});

var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "r11"
};

razor.orders.create(options, function(err, order) {
  console.log(order);
});

module.exports = app;
