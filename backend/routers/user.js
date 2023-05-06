const { Router } = require('express');
const { body } = require('express-validator');
const {
  registrationUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
  usersAll,
} = require('../controllers/user');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 36 }),
  body('name').isLength({ min: 2, max: 36 }).isAlphanumeric(),
  registrationUser
);
router.post(
  '/Login',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 36 }),
  loginUser
);
router.get('/logout', logoutUser);
router.get('/refresh', refreshTokenUser);
router.get('/users', usersAll);

/* router.get('/userPosts', userPosts);
router.get('/userLikes', userLikes); */

module.exports = router;
