const UserService = require('../services/user.service');
const { successResponse, errorResponse } = require('../helper/response');

class UserController {
  async create(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);
      return successResponse(res, 'User created successfully', user, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User retrieved successfully', user);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updatedUser = await UserService.updateUser(userId, updateData);
      if (!updatedUser) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async delete(req, res) {
    try {
      const userId = req.params.id;
      const result = await UserService.deleteUser(userId);
      if (!result) {
        return errorResponse(res, 'User not found', 404);
      }
      return successResponse(res, 'User deleted successfully', null, 204);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.loginUser(email, password);
      if (result.statusCode) {
        return errorResponse(res, result.message, result.statusCode);
      }
      return successResponse(res, 'Login successful', { user: result.user, token: result.token });
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async logout(req, res) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const userId = req.user.id;
      const result = await UserService.logoutUser(userId, token);
      if (result.statusCode) {
        return errorResponse(res, result.message, result.statusCode);
      }
      return successResponse(res, 'Logout successful', null, 204);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

module.exports = new UserController();
