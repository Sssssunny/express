const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Suuny' });
});

/* 로그인 페이지 접속 */
router.get('/login', function(req, res, next) {

  // console.log('---------------session---------------');
  // console.log(req.session);
  // console.log('-------------------------------------');

  console.log('---------------로그인 페이지 접속---------------');

  if (req.session.user_id && req.session.user_pw) {
      
      const params = {
      user_id : req.body.id,
      user_pw : req.body.pw
    };

  } else {
    res.render('login', { title: '로그인' });
  }
});

/* 로그인 처리 */
router.post('/login', urlencodedParser, function (req, res, next) {

  const params = {
    user_id : req.body.id,
    user_pw : req.body.pw
  };

  req.session.user_id = params.user_id;
  req.session.user_pw = params.user_pw;

  console.log('---------------로그인---------------');
  console.log(req.session);
  console.log('------------------------------------');

  res.render('confirm', params)
});

/* 로그아웃 처리 */
router.get('/logout', function(req, res, next) {

  res.render('logout');
  req.session.destroy();

  console.log('---------------로그아웃---------------');
});

/* 회원가입 페이지 접속 */
router.get('/join', function(req, res, next) {
  res.render('join');
  console.log('---------------회원가입 페이지 접속---------------');
});

/* 게시판 접속 */
router.get('/board', function(req, res, next) {
  res.render('board');
  console.log('---------------말모이 게시판 접속---------------');
});


module.exports = router;