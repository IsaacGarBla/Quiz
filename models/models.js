var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importamos la definición de la tabla QUIZ de quiz,js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;	// Exportar la definición de la tabla Quiz.

// 
sequelize.sync().success(function() {
  // success(...) ejecuta el manejador (la función) una vez creada la tabla.
  Quiz.count().success(function(count) {
   if (count===0) { // La tabla está vacía, hay que inicializarla.
	Quiz.create({ pregunta: '¿Cuál es la capital de Italia?',
		      respuesta: '^( )*roma( )*$'}).success(function() { console.log('BBDD inicializada.');});
      }; 
    });
 });