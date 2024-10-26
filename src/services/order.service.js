const Order = require('../model/order.model');
const Product = require('../model/product.model');

class OrderService {
  async createOrder(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  async getAllOrders() {
    return await Order.find().populate('customerId items.productId items.colorId');
  }

  async getOwnedOrders(customerId) {
    return await Order.find({ customerId }).populate('customerId items.productId items.colorId');
  }

  async getOrderById(orderId) {
    return await Order.findById(orderId).populate('customerId items.productId items.colorId');
  }

  async updateOrder(orderId, updateData) {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true }).populate('customerId items.productId');
  }

  async updateOrderStatus(orderId, status) {
    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      throw new Error('Invalid order status');
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return null;
    }

    order.status = status;
    await order.save();
    return order;
  }

  async deleteOrder(orderId) {
    return await Order.findByIdAndDelete(orderId);
  }
}

module.exports = new OrderService();
