const Product = require('../model/product.model');

class ProductService {
  async createProduct(productData) {
    const product = new Product(productData);
    await product.save();
    return product;
  }

  async getAllProducts() {
    return await Product.find().populate('colors');
  }

  async getProductById(productId) {
    return await Product.findById(productId).populate('colors');
  }

  async updateProduct(productId, updateData) {
    return await Product.findByIdAndUpdate(productId, updateData, { new: true }).populate('colors');
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

module.exports = new ProductService();
