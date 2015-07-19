var path = require('path');
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd,
		{dialect: 	protocol,
		protocol: 	protocol,
		port: 		port,
		host:		host,
		storage:	storage,
		omitNull:	true
		}
);
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
exports.Quiz = Quiz;
//Cargar Modelo ORM
/*
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
		{dialect: "sqlite", storage: "quiz.sqlite"}
		);
		
// Importar la definicion d ela tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;
*/
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
 Quiz.count().success(function(count){
  if(count===0){
	Quiz.create({ pregunta: 'Capital de Italia',
				  respuesta: 'Roma'
				  })
		.success(function(){console.log('Base de datos inicializada')});
		};
	});
});