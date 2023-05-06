const { postsAllService, likeService } = require('../service/post-service');

async function postsAll(req, res, next) {
  try {
    const postsData = await postsAllService();
    res.json(postsData);
  } catch (e) {
    next(e);
  }
}

async function postLike(req, res, next) {
  try {
    const user = req.user;
    const postId = req.params.postId;
    const likeData = await likeService(user, postId);

    res.json(likeData);
  } catch (e) {
    next(e);
  }
}

module.exports = { postsAll, postLike };
