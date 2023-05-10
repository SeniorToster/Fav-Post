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
    }),
  }),
});

export const {
  usePostsQuery,
  usePostCreateMutation,
  usePostLikedMutation,
  usePostDeleteMutation,
} = postApiSlice;
