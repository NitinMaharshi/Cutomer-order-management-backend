const Color = require('../model/color.model');

class ColorService {
  async createColor(data) {
    const color = new Color(data);
    return color.save();
  }

  async getColorById(colorId) {
    return Color.findById(colorId);
  }

  async getAllColors() {
    return Color.find();
  }

  async updateColor(colorId, data) {
    return Color.findByIdAndUpdate(colorId, data, { new: true });
  }

  async deleteColor(colorId) {
    return Color.findByIdAndDelete(colorId);
  }
}

module.exports = new ColorService();