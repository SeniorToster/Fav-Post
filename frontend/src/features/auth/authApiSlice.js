import { apiSlice } from '../../app/api/apiSlice';

const AuthApiSlice = apiSlice.injectEndpoints({
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
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useRefreshQuery,
  useUsersQuery,
  useLazyLogoutQuery,
} = AuthApiSlice;
