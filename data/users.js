// data/users.js
// PURPOSE: All test data in one place
//
// WHY separate data file?
//   Tests should not have hardcoded values scattered everywhere
//   Change data once here → all tests updated
//   Makes tests readable — validUser.username not 'tomsmith'

const users = {

  // valid user — used for successful login tests
  validUser: {
    username: process.env.TEST_USERNAME || 'tomsmith',
    password: process.env.TEST_PASSWORD || 'SuperSecretPassword!'
    // || means: use env variable if it exists, otherwise use the default
    // in CI: reads from pipeline secrets
    // locally: reads from .env file
  },

  // invalid user — used for failed login tests
  invalidUser: {
    username: 'wronguser',
    password: 'wrongpassword'
  },

  // valid username but wrong password
  wrongPassword: {
    username: 'tomsmith',
    password: 'wrongpassword'
  },

  // empty credentials
  emptyCredentials: {
    username: '',
    password: ''
  }
}

// API test data — for jsonplaceholder
const apiUsers = {

  // new user to create
  newUser: {
    name: 'Manisha Test',
    username: 'manisha_test',
    email: 'manisha@test.com',
    phone: '021-555-1234',
    website: 'manishatest.com'
  },

  // updated user data
  updatedUser: {
    name: 'Manisha Updated',
    email: 'updated@test.com'
  },

  // invalid user — missing required fields
  invalidUser: {
    username: ''
    // name and email missing
  }
}

module.exports = { users, apiUsers }
