import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/post',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('token', `${token}`)
    }
    return headers
  }
})

const postApi = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({
    getAllPosts: builder.query({
      query: () => `/`
    }),
    // getUserPosts: builder.query({
    //   query: ({ user_id }) => `/${user_id}`
    // }),
    createPost: builder.mutation({
      query: ({ message }) => ({
        url: `/`,
        method: 'POST',
        body: {
          "message": message
        }
      })
    }),
    editPost: builder.mutation({
      query: ({ id, message }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: {
          "message": message
        }
      })
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllPostsQuery,
  // useGetUserPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = postApi

export default postApi
