import { api } from '../../app/api/api';

export const authApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credential => ({
        url: '/login',
        method: 'POST',
        body: credential,
      }),
    }),
    registration: builder.mutation({
      query: credential => ({
        url: '/registration',
        method: 'POST',
        body: credential,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
    }),
    users: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    user: builder.query({
      query: userId => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useRefreshQuery,
  useUsersQuery,
  useUserQuery,
  useLazyLogoutQuery,
} = authApiSlice;
