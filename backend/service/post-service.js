const uuid = require('uuid');
const { Posts, LikesPosts, Users } = require('../models');

async function postsAllService({ userId, isLiked }) {
  if (userId) {
    if (isLiked) {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            as: 'likes',
            where: {
              id: userId,
            },
          },
          'ownerUser',
        ],
      });
      return posts;
    }
    const posts = await Posts.findAll({
      where: { owner_post: userId },
      order: [['created_At', 'DESC']],
      include: ['ownerUser', 'likes'],
    });
    return posts;
  } else {
    const posts = await Posts.findAll({
      order: [['created_At', 'DESC']],
      include: ['ownerUser', 'likes'],
    });
    return posts;
  }
}

async function likeService(user, postId) {
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
}

async function postCreateService(user, title, description) {
  const id = uuid.v4();
  const created_At = new Date().getTime();

  await Posts.create({
    id,
    title,
    description,
    owner_post: user.id,
    created_At,
  });

  return;
}

module.exports = { postsAllService, likeService, postCreateService };

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
