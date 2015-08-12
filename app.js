var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session =  require('express-session');

// Importamos el modulo express-partials
var partials = require('express-partials');

var routes = require('./routes/index');

var app = express();
var ultimoAcceso; 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Instalamos el MW que da soporte a las vistas parciales.
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

// Control para autologout de session
app.use(function(req, res, next) {
  if (req.session.user) {
	console.log("Usuario validado, control de tiempo");
	// Se trata de un acceso de un usuario validado.
	ultimoAcceso = ultimoAcceso || new Date();	// Si la variable tiene valor no se modificara.
	if (ultimoAcceso.getTime() + 120000 < new Date().getTime()) {	// 120 segundos.
		// Han pasado más de dos minutos.
		delete req.session.user; // Destruir session.
		res.render('sessions/new', {errors: [{"message": "Su sesión ha caducado, acceda otra vez."}]});
	} else
	ultimoAcceso = new Date(); // Actualizamos la fecha del último acceso.
  }
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
	    errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
	errors:[]
    });
});


module.exports = app;
