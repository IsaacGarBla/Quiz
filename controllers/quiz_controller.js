// GET quizes/question
exports.question = function (req,res) {
	res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?'})
};

// GET quizes/answer
exports.answer = function (req, res) {
	var ExpresionRegular = RegExp(/^( )*roma( )*$/i);

	if (ExpresionRegular.test(req.query.respuesta)) {
		res.render('quizes/answer', {respuesta: 'Correcto'})
		} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'})		
		}
};

