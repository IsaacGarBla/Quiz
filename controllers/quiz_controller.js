// Importamos el modelo

var models = require('../models/models.js');

// Autolad - factoriza rl códico si ruta incuye :quizId
// cargando la pregunta de la BBDD.
exports.load = function (req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function (quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
				}
			else {
				next(new Error('No existe quizId=' + quizId));
				}
		}
		).catch(function (error) { next(error);});
};
		

//GET /quizes
exports.index= function (req, res) {
	// Componemos la cadena a buscar sustituyendo los espacios en blanco por el caracter comodin.
	var strLike;
	
	req.query.search = req.query.search || "";	// Se utiliza para el caso de que search sea 'undefined'
	strLike = "%" + (req.query.search.replace(/( )+/g, "%") || "")  + "%";
	console.log(strLike);
	models.Quiz.findAll({where: ["pregunta like ?", strLike]}).then(function(quizes) {
		// Devolvemos la lista de todas las preguntas para 
		// renderizarla con la vista index.
		res.render('quizes/index', {quizes: quizes});
	  }).catch (function (error) { next(error);});
};


//GET quizes/:Id
exports.show = function (req,res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// GET quizes/:Idanswer
exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (RegExp(req.quiz.respuesta, 'i').test(req.query.respuesta)) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

