import React, { Fragment } from 'react'
import CreatePost from '../components/CreatePost'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ListPosts from '../components/ListPosts'

const Wall = () => {
  return (
    <Fragment>
      <Header />
      <div className='d-flex flex-column align-items-center min-vh-100'>
        <CreatePost />
        <ListPosts />
      </div>
      <Footer />
    </Fragment>
  )
}

export default Wall
