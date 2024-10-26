const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  colors: [{
    type: Schema.Types.ObjectId,
    ref: 'Color',
    required: true,
  }],
  sizes: {
    type: [String],
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
