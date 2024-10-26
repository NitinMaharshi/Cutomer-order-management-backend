const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  }

  async getAllUsers() {
    return await User.find().select('-password -tokens');
  }

  async getUserById(userId) {
    return await User.findById(userId).select('-password -tokens');
  }

  async updateUser(userId, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      return { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { statusCode: 401, message: 'Invalid credentials' };
    }

    const token = this.generateToken(user._id);
    user.tokens.push({ token });
    await user.save();

    const userData = user.toObject();
    delete userData.password;
    delete userData.tokens;

    return { user: userData, token };
  }


  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
  }

  async logoutUser(userId, token) {
    const user = await User.findById(userId);
    if (!user) {
      return { statusCode: 404, message: 'User not found' };
    }

    user.tokens = user.tokens.filter(t => t.token !== token);
    await user.save();

    return { message: 'Logout successful' };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return { statusCode: 401, message: 'Invalid token' };
    }
  }
}

module.exports = new UserService();
