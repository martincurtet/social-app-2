import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/auth',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('token', `${token}`)
    }
    return headers
  }
})

const authApi = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials }
      })
    })
  })
})

export const { useLoginMutation } = authApi

export default authApi
