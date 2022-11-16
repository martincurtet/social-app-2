import React, { Fragment } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div className='d-flex m-5 flex-column align-items-center min-vh-100'>
        <h1>Welcome to Social App 2</h1>

        <div className='d-flex m-5 flex-column gap-2'>
          <p className='align-self-center'><b>Structure:</b></p>
          <ul>
            <li><u>Frontend:</u> React with Redux store and React router routing for the following pages: <u>Home</u> <u>Register</u> <u>Login</u> <u>Wall (protected)</u></li>
            <li><u>Backend:</u> Node JS, Express</li>
            <li><u>Database:</u> Postgresql, tables:
              <ul>
                <li>users (id, username, password (encrypted) )</li>
                <li> posts (id, user_id (fk), message, timestamp)</li>
              </ul>
            </li>
          </ul>

          <p className='align-self-center'><b>Features:</b></p>
          <ul>
            <li><u>Register</u>, with a username, password and confirm password</li>
            <li><u>Login</u>, with a username and password</li>
            <li><u>Wall</u>, see list of posts from all users in chronological order</li>
            <li><u>Wall</u>, create a new post</li>
            <li><u>Wall</u>, edit your one posts</li>
            <li><u>Wall</u>, delete your one posts</li>
          </ul>

          <p className='align-self-center'><b>Todo:</b></p>
          <ul>
            <li>Posts page to just see and manage your own posts</li>
            <li>Profile page to see and change your username and password</li>
            <li>Admin panel to manage users (CRUD)</li>
          </ul>
        </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Home
