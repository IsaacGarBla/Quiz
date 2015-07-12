var express = require('express');
var router = express.Router();

// Incluímos el controlador para las preguntas.
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz'});
});

// Añadimos las dos acciones a controlar.
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
