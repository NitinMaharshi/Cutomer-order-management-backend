const ProductService = require('../services/product.service');
const { successResponse, errorResponse } = require('../helper/response');

class ProductController {
  async create(req, res) {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      return successResponse(res, 'Product created successfully', product, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getAll(req, res) {
    try {
      const { color, size } = req.query;
      const filter = {};

      if (color) {
        filter.colors = color;
      }

      if (size) {
        filter.sizes = size;
      }

      const products = await ProductService.getAllProducts(filter);
      return successResponse(res, 'Products retrieved successfully', products);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getById(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return errorResponse(res, 'Product not found', 404);
      }
      return successResponse(res, 'Product retrieved successfully', product);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async update(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, updateData);
      if (!updatedProduct) {
        return errorResponse(res, 'Product not found', 404);
      }
      return successResponse(res, 'Product updated successfully', updatedProduct);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async delete(req, res) {
    try {
      const productId = req.params.id;
      const result = await ProductService.deleteProduct(productId);
      if (!result) {
        return errorResponse(res, 'Product not found', 404);
      }
      return successResponse(res, 'Product deleted successfully', [], 200);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

module.exports = new ProductController();
