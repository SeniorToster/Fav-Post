import { api } from '../../app/api/api';

const postApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    posts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['post'],
    }),
    postsUser: builder.query({
      query: ({ userId, isLiked }) => ({
        url: '/posts',
        method: 'GET',
        params: {
          userId,
          isLiked,
        },
      }),
      providesTags: ['liked'],
    }),
    postCreate: builder.mutation({
      query: post => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['post'],
    }),
    postDelete: builder.mutation({
      query: postId => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
    }),
    postLiked: builder.mutation({
      query: postId => ({
        url: `/post/liked/${postId}`,
        method: 'POST',
      }),
      invalidatesTags: ['liked'],
    }),
  }),
});

export const {
  usePostsQuery,
  usePostsUserQuery,
  usePostCreateMutation,
  usePostLikedMutation,
  usePostDeleteMutation,
} = postApiSlice;
