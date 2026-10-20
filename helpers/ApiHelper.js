// helpers/ApiHelper.js
// PURPOSE: All API calls in one place
//
// WHY static methods?
//   Static = no need to create an object first
//   Call directly: ApiHelper.getUser(1)
//   Not:           new ApiHelper().getUser(1)
//
// WHY a helper class?
//   Tests should not contain raw API calls
//   Helper centralises them — change URL once here, not in every test
//   Makes tests readable: ApiHelper.createUser() not request.post(...)

class ApiHelper {

  // CREATE — POST a new user
  // static = call without creating object: ApiHelper.createUser(request, data)
  static async createUser(request, userData) {
    const response = await request.post('/users', {
      // baseURL from playwright.config.js is used automatically
      data: userData
    })
    return response
    // WHY return?
    //   Caller needs the response to check status and body
    //   Without return, caller gets undefined
  }

  // READ — GET a user by id
  static async getUser(request, id) {
    const response = await request.get(`/users/${id}`)
    return response
  }

  // READ — GET all users
  static async getAllUsers(request) {
    const response = await request.get('/users')
    return response
  }

  // UPDATE — PUT to update a user
  static async updateUser(request, id, userData) {
    const response = await request.put(`/users/${id}`, {
      data: userData
    })
    return response
  }

  // DELETE — DELETE a user
  static async deleteUser(request, id) {
    const response = await request.delete(`/users/${id}`)
    return response
  }

  // HELPER — parse body from response
  // used everywhere so putting it here avoids repetition
  static async parseBody(response) {
    return await response.json()
    // WHY return?
    //   Caller needs the parsed body object
    //   Without return, caller gets undefined
  }
}

module.exports = { ApiHelper }
