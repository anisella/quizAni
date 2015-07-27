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
	console.log(req.query.search);
	var tr = req.query.search;//str = str.replace(/\s+/g, '-');

	tr = tr==undefined?'%':'%' + tr.replace(/\s+/g, '%') + '%';
	models.Quiz.findAll({where: ["pregunta like ?", tr ]}).then(
		function(quizes){
			res.render('quizes/index', {quizes: quizes});
		}
	).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req, res){
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
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
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
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
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz);
	
	//guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};