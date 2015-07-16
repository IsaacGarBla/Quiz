// Importamos el modelo

var models = require('../models/models.js');


//GET /quizes
exports.index = function (req, res) {
	models.Quiz.findAll().then(function(quizes) {
		// Devolvemos la lista de todas las preguntas para 
		// renderizarla con la vista index.
		res.render('quizes/index', {quizes: quizes});
	  })
};

//GET quizes/:Id
exports.show = function (req,res) {
	models.Quiz.find(req.params.quizId).then (function(quiz) {
		// Si encontramos la pregunta, renderizamos la vista show pasándo como 
		// parámetro la pregunta.	   
		res.render('quizes/show', {quiz: quiz})
	  })
};

// GET quizes/:Idanswer
exports.answer = function (req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if (RegExp(quiz.respuesta, 'i').test(req.query.respuesta)) {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'})
		 	}
		else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'})		
		  	}
		})
};

