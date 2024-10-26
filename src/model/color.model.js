const { string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
    versionKey: false
  });

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
