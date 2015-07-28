var express = require('express');
var router = express.Router();

// Incluímos el controlador para las preguntas.
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[]});
});

/* GET Créditos- */
router.get('/author', function(req, res) {
  res.render('author', { errors:[]});
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
router.get('/quizes/new',			quizController.new);
router.post('/quizes/create',			quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);
router.put('/quizes/:quizId(\\d+)',		quizController.update);
router.delete('/quizes/:quizId(\\d+)',		quizController.destroy);

module.exports = router;
