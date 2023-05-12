const uuid = require('uuid');
const { Posts, LikesPosts, Users } = require('../models');

async function postsAllService({ userId, isLiked }) {
  const posts = await Posts.findAll({
    order: [['created_At', 'DESC']],
    include: [
      {
        model: Users,
        as: 'likes',
        attributes: ['id', 'name'],
      },
      {
        model: Users,
        as: 'ownerUser',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (userId) {
    if (isLiked) {
      const like = posts.filter(post =>
        post.likes.some(like => like.id === userId)
      );
      return like;
    }
    return posts.filter(post => post.owner_post === userId);
  } else {
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
      include: [
        {
          model: Users,
          as: 'likes',
          attributes: ['id', 'name'],
        },
      ],
    });

    return likes;
  }

  const id = uuid.v4();
  await LikesPosts.create({ id, postId, userId: user.id });
  const { likes } = await Posts.findOne({
    where: { id: postId },
    include: [
      {
        model: Users,
        as: 'likes',
        attributes: ['id', 'name'],
      },
    ],
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

async function postDeleteService(user, postId) {
  const post = await Posts.destroy({
    where: {
      id: postId,
      owner_post: user.id,
    },
    include: ['likes'],
  });
  const liked = await LikesPosts.destroy({
    where: {
      postId: postId,
    },
  });
  return;
}

module.exports = {
  postsAllService,
  likeService,
  postCreateService,
  postDeleteService,
};

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
