const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const cacheMiddleware = require('./middleware/cache');
const indexRouter = require('./routes/index');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cacheMiddleware(10));

// Routes
app.use('/', indexRouter);

// Error handlers
app.use((_req, _res, next) => next(createError.NotFound()));
app.use((err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).render('error');
});

module.exports = app;
