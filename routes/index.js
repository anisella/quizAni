var express = require('express');
var quizController = require('../controllers/quiz_controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
//Autoload
router.param('quizId', quizController.load);

router.get('/author', function(req, res) {
  res.render('author', { autor: 'Anisella Jimenez' });
});
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

module.exports = router;
