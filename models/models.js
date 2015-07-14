var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
			{dialect: "sqlite", storage: "quiz.sqlite"});

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
