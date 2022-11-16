import React, { Fragment } from 'react'
import Post from './Post'

import { useGetAllPostsQuery } from '../app/api/postApi'

const ListPosts = () => {
  const { data = [], isLoading, isError } = useGetAllPostsQuery()

  return (
    <div className='d-flex m-5 flex-column align-items-center w-100'>
      {isError ? (
      <div>Error: couldn't load data</div>
      ) : isLoading ? (
      <div>Loading...</div>
      ) : data ? (
      <Fragment>
        {data.posts.slice(0).reverse().map((p, i) => (
          <Post
            key={i}
            postData={{
              id: p.id,
              user: p.username,
              content: p.message,
              time: p.timestamp
            }}
          />
        ))}
      </Fragment>
      ) : (
      <div>No posts to display</div>
      )}
    </div>
  )
}

export default ListPosts
