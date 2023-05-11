const { validationResult } = require('express-validator');

const {
  postsAllService,
  likeService,
  postCreateService,
  postDeleteService,
} = require('../service/post-service');
const { apiError } = require('../service/error-service');

async function postsAll(req, res, next) {
  try {
    const postsData = await postsAllService(req.query);
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

async function postsCreate(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw apiError.badRequest('Ошибка валидации', errors.array());
    }

    const user = req.user;
    const { title, description } = req.body;
    await postCreateService(user, title, description);

    res.status(200).send('');
  } catch (e) {
    next(e);
  }
}

async function postDelete(req, res, next) {
  try {
    const user = req.user;
    const postId = req.params.postId;
    await postDeleteService(user, postId);

    res.status(200).send('');
  } catch (e) {
    next(e);
  }
}

module.exports = { postsAll, postLike, postsCreate, postDelete };
