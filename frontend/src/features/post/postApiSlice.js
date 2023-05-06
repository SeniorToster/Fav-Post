import { apiSlice } from '../../app/api/apiSlice';

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    posts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    postCreate: builder.mutation({
      query: post => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
    }),
    postDelete: builder.mutation({
      query: postId => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
      keepUnusedDataFor: 5,
    }),
    postLiked: builder.mutation({
      query: postId => ({
        url: `/post/liked/${postId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  usePostsQuery,
  usePostCreateMutation,
  usePostLikedMutation,
  usePostDeleteMutation,
} = postApiSlice;
