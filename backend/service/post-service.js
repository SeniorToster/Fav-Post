const uuid = require('uuid');
const { Posts, Users, LikesPosts } = require('../models');
const { apiError } = require('./error-service');

async function postsAllService() {
  const post = await Posts.findAll({
    include: ['ownerUser', 'likes'],
  });

  return post;
}

async function likeService(user, postId) {
  try {
    const likeBD = await LikesPosts.findOne({
      where: { postId, userId: user.id },
    });

    if (likeBD) {
      await likeBD.destroy();
      const { likes } = await Posts.findOne({
        where: { id: postId },
        include: ['likes'],
      });

      return likes;
    }

    const id = uuid.v4();
    await LikesPosts.create({ id, postId, userId: user.id });
    const { likes } = await Posts.findOne({
      where: { id: postId },
      include: ['likes'],
    });

    return likes;
  } catch (e) {
    apiError.badRequest(410, 'тест', e);
  }
}

module.exports = { postsAllService, likeService };

/*const likeBD = await Posts.findOne({
      where: { id: '3' },
      include: {
        model: Users,
        as: 'likes',
        where: {
          id: '135373cc-297c-4dac-85e9-fc463f61d925',
        },
      },
    });

      const post = await Posts.findAll({
    include: ['ownerUser', 'likes'],
  });*/
