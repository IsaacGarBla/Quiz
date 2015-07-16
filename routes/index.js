var express = require('express');
var router = express.Router();

// Incluímos el controlador para las preguntas.
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz'});
});

/* GET Créditos- */
router.get('/author', function(req, res) {
  res.render('author');
});

// Autoload de comandos con quizId
router.param('quizId', quizController.load);

// Definimos las rutas de Quizez teniendo en cuenta que puede haber más
// de una pregunta.
// Se utilizan expresiones regulares para indicar que el parámetro quizId 
// debe ser un numero.
router.get('/quizes', 				quizController.index)
router.get('/quizes/:quizId(\\d+)',		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);

module.exports = router;
