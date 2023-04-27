const { Router } = require('express');
const { registrationUser } = require('../controllers/user');

const router = new Router();

router.post('/registration', registrationUser);
router.post('/Login');
router.post('/logout');
router.get('/refresh');
router.get('/users');

module.exports = router;
