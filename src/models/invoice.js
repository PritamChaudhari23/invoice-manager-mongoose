const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;