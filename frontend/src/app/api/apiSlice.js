/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import actionsAuth from '../../features/auth/authSlice';

const fetchBase = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.tokenAccess;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const fetchBaseWithReauth = async (args, api, extraOptions) => {
  const result = await fetchBase(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await fetchBase('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(actionsAuth.setCredential);
      const result = await fetchBase(args, api, extraOptions);

      return result;
    } else {
      api.dispatch(actionsAuth.logout);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseWithReauth,
  endpoints: builder => ({}),
});
