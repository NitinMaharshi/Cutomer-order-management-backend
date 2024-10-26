const OrderService = require('../services/order.service');
const { successResponse, errorResponse } = require('../helper/response');

class OrderController {
  async create(req, res) {
    try {
      const orderData = { ...req.body, customerId: req.user._id };
      const order = await OrderService.createOrder(orderData);
      return successResponse(res, 'Order created successfully', order, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      return successResponse(res, 'Orders retrieved successfully', orders);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async myOrders(req, res) {
    try {
      const orders = await OrderService.getOwnedOrders(req.user._id);
      return successResponse(res, 'Orders retrieved successfully', orders);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return errorResponse(res, 'Order not found', 404);
      }
      return successResponse(res, 'Order retrieved successfully', order);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async update(req, res) {
    try {
      const orderId = req.params.id;
      const updateData = req.body;
      const updatedOrder = await OrderService.updateOrder(orderId, updateData);
      if (!updatedOrder) {
        return errorResponse(res, 'Order not found', 404);
      }
      return successResponse(res, 'Order updated successfully', updatedOrder);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      const updatedOrder = await OrderService.updateOrderStatus(orderId, status);

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return successResponse(res, 'Order status updated successfully', updatedOrder)
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async delete(req, res) {
    try {
      const orderId = req.params.id;
      const result = await OrderService.deleteOrder(orderId);
      if (!result) {
        return errorResponse(res, 'Order not found', 404);
      }
      return successResponse(res, 'Order deleted successfully', null, 204);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

module.exports = new OrderController();
