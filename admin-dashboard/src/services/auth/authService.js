import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_ENDPOINT}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken || localStorage.getItem('userToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => {
                const storedUserInfo = localStorage.getItem('userInfo');
                if (storedUserInfo) {
                    return {
                        url: '',
                        method: 'GET',
                    };
                }
                return {
                    url: 'api/v1/user/profile',
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApi;

