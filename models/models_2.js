var path = require('path');
//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
		{dialect: "sqlite", storage: "quiz.sqlite"}
		);
		
// Importar la definicion d ela tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
 Quiz.count().success(function(count){
  if(count===0){
	Quiz.create({ pregunta: 'Capital de Italia',
				  respuesta: 'Roma'
				  })
		.success(function(){console.log('Base de datos inicializada')});
		};
	});
});