import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/api/auth/login",
                    method: "POST",
                    body,
                }
            }
        }),
        logoutUser: builder.query<void, void>({
            query: () => `/api/auth/logout`
        })
    }),
})

export const { useLoginUserMutation, useLogoutUserQuery } = authApi;