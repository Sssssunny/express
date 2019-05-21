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

/**
 * 로그인 페이지 접근
 */
router.get('/login', function(req, res, next) {

  // console.log('------------session------------');
  // console.log(req.session);
  // console.log('-------------------------------');

  console.log('------------session------------');
  console.log('로그인 페이지 접근');
  console.log('-------------------------------');

  if (req.session.user_id && req.session.user_pw) {
      
      const params = {
      user_id : req.body.id,
      user_pw : req.body.pw
    };

  } else {
    res.render('login', { title: '로그인' });
  }
});

/**
 * 로그인 처리
 */
router.post('/login', urlencodedParser, function (req, res, next) {

  const params = {
    user_id : req.body.id,
    user_pw : req.body.pw
  };

  req.session.user_id = params.user_id;
  req.session.user_pw = params.user_pw;

  console.log('------------requ.session------------');
  console.log(req.session);
  console.log('------------------------------------');

  res.render('confirm', params)
  
});

module.exports = router;