const router = require('koa-router')(),
    User = require('../controllers/userController');

//    User.test();
router.post('/register', User.register);
console.log(User.login);
router.post('/login', User.login);
router.post('/details', User.details);
router.get('/users',User.findAll);
router.post('/getUser',User.find);

module.exports = router;