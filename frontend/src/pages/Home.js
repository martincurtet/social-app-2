import React, { Fragment } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {
  return (
    <Fragment>
      <Header />
      <h1 className='d-flex m-5 justify-content-center min-vh-100'>Welcome to Social App 2</h1>
      <Footer />
    </Fragment>
  )
}

export default Home
