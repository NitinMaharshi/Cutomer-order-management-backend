const colorService = require('../services/color.service');
const { successResponse, errorResponse } = require('../helper/response');

class ColorController {
  async createColor(req, res) {
    try {
      const color = await colorService.createColor(req.body);
      return successResponse(res, 'Color created successfully', color, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getColor(req, res) {
    try {
      const color = await colorService.getColorById(req.params.id);
      if (!color) {
        return errorResponse(res, 'Color not found', 404);
      }
      return successResponse(res, 'Color retrieved successfully', color);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getAllColors(req, res) {
    try {
      const colors = await colorService.getAllColors();
      return successResponse(res, 'Colors retrieved successfully', colors);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async updateColor(req, res) {
    try {
      const color = await colorService.updateColor(req.params.id, req.body);
      if (!color) {
        return errorResponse(res, 'Color not found', 404);
      }
      return successResponse(res, 'Color updated successfully', color);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async deleteColor(req, res) {
    try {
      const color = await colorService.deleteColor(req.params.id);
      if (!color) {
        return errorResponse(res, 'Color not found', 404);
      }
      return successResponse(res, 'Color deleted successfully', [], 200);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

module.exports = new ColorController();
