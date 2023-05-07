/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { actionsAuth } from '../../features/auth/authSlice';



const fetchBase = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.tokenAccess;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const fetchBaseWithReauth = async (args, api, extraOptions) => {
  let result = await fetchBase(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await fetchBase('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(actionsAuth.setCredential({ ...refreshResult.data }));
      result = await fetchBase(args, api, extraOptions);
    } else {
      api.dispatch(actionsAuth.logout);
      console.log('выход');
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseWithReauth,
  endpoints: builder => ({}),
});
