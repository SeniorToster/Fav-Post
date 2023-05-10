const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const { postsAll, postLike, postsCreate } = require('../controllers/post');

const router = new Router();

router.get('/posts', postsAll);
router.post('/post/liked/:postId', authMiddleware, postLike);
router.post(
  '/post',
  authMiddleware,
  body('title').isLength({ min: 3, max: 50 }),
  body('description').isLength({ min: 3, max: 1000 }),
  postsCreate
);
/* router.delete('/post:postId', authMiddleware, postsDelete);
 */

module.exports = router;
