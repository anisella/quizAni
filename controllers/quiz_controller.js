var models = require('../models/models.js');

// Autoload 
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){ next(error);});
};

// GET /quizes
exports.index = function(req, res){

	var tr = req.query.search;//str = str.replace(/\s+/g, '-');

	tr = tr==undefined?'%':'%' + tr.replace(/\s+/g, '%') + '%';
	models.Quiz.findAll({where: ["pregunta like ?", tr ]}).then(
		function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error)});
};

// GET /quizes/:id
exports.show = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	//})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	//models.Quiz.find(req.params.quizId).then(function(quiz){	
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
			//res.render('quizes/answer', 
			//{quiz: quiz, respuesta:'Correcto'});
		} 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
		/*else {
			res.render('quizes/answer', 
			{quiz: quiz, respuesta: 'Incorrecto'});
		}*/
	//})
};

//GET /quizes/new
exports.new = function(req,res) {
	var quiz = models.Quiz.build( //Crea objeto Quiz
		{pregunta: "Pregunta",  respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz);
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/new', {quiz:quiz, errors: err.errors});
			} else {
				quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes')})
			}		
		}
	);
};


//GET /quizes/:id/edit
exports.edit = function(req,res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT /quizes/:id
exports.update = function(req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	//guarda en DB los campos pregunta y respuesta de quiz
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes');});
			}		
		}
	);
};