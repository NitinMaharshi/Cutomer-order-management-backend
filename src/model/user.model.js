const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['Customer', 'Admin'],
      required: true,
      default: 'Customer',
    },
    tokens: [{ //store jwt tokens array
      type: Object,
      default: null
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
