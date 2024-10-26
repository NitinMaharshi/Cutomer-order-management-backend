const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String, // Assuming size is a string like 'S', 'M', 'L', etc.
        required: true,
      },
      colorId: {
        type: Schema.Types.ObjectId,
        ref: 'Color',
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
    versionKey: false
  });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
