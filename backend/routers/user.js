const { Router } = require('express');
const { body } = require('express-validator');
const {
  registrationUser,
  loginUser,
  logoutUser,
} = require('../controllers/user');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 36 }),
  body('name').isLength({ min: 2, max: undefined }).isAlphanumeric(),
  registrationUser
);
router.post(
  '/Login',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 36 }),
  loginUser
);
router.post('/logout', logoutUser);
router.get('/refresh');
router.get('/users');

module.exports = router;
