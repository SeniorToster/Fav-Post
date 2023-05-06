const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const { postsAll, postLike } = require('../controllers/post');

const router = new Router();

router.get('/posts', postsAll);
router.post('/post/liked/:postId', authMiddleware, postLike);
/* router.post('/post', authMiddleware, postsCreate);
router.delete('/post:postId', authMiddleware, postsDelete);
 */

module.exports = router;
