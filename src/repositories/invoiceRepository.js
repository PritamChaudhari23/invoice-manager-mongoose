const Invoice = require("../models/invoice");

class InvoiceRepository {
  async create(data) {
    return Invoice.create(data);
  }

  async findAll(filter = {}) {
    return Invoice.find(filter);
  }

  async findById(id) {
    return Invoice.findById(id);
  }

  async updateById(id, data) {
    return Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return Invoice.findByIdAndDelete(id);
  }
}

module.exports = new InvoiceRepository();
