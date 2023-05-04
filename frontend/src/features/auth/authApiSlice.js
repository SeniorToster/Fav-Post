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
  }),
});

export const { useLoginMutation, useRegistrationMutation } = AuthApiSlice;
