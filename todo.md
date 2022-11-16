# Social App 2

## Frontend
- Pages:
  - Home page
  - Register page
    - (Replace username with email)
  - Login page
  - Wall page
    - Create post
    - List post
    - Edit post modal
    - Delete post modal
  - (Admin page)

- Redux store done
- React cookie, set on login and remove on logout

TODO: add email
TODO: username, email, password requirements and security
TODO: sql injections
TODO: posts by user route

## Backend
- Auth Routes:
  - register
  - login
  - is-verify

- Post Routes:
  - Create
  - Read, Read by user
  - Update
  - Delete

- (Admin Routes)
    - Create user
    - Read all users
    - Edit user
    - Delete user

TODO: setup middleware validation
BUG: escape quotes in message
TODO: add email
TODO: posts by user route

## Database
- User table
  - id
  - username
  - password: (crypted)

- Post table
  - id
  - user_id: FK users.id
  - message
  - timestamp: done automatically on the backend

BUG: Foreign key doesn't work
TODO: Add email
