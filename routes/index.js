var express = require('express');
var router = express.Router();

// Incluímos el controlador para las preguntas.
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

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

// Definimos las rutas de sesión.
router.get('/login',  				sessionController.new);     // formulario login
router.post('/login', 				sessionController.create);  // crear sesión
router.get('/logout', 				sessionController.destroy); // destruir sesión, lo correcto sería delete.

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

// Rutas para el controlador de comentarios.
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',	commentController.create);

module.exports = router;
