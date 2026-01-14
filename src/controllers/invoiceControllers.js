const mongoose = require("mongoose");
const invoiceRepo = require("../repository/invoiceRepository");

// CREATE
async function addInvoice(req, res) {
  try {
    const invoice = await invoiceRepo.create(req.body);
    return res.status(201).json(invoice);
  } catch (error) {
    console.error("Add invoice error:", error.message);
    return res.status(500).json({ message: "Failed to add invoice" });
  }
}

// RETRIEVE ALL
async function getAllInvoices(req, res) {
  try {
    const invoices = await invoiceRepo.findAll();
    return res.status(200).json(invoices);
  } catch (error) {
    console.error("Get invoices error:", error.message);
    return res.status(500).json({ message: "Failed to fetch invoices" });
  }
}

// RETRIEVE ONE
async function getInvoiceById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const invoice = await invoiceRepo.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    console.error("Get invoice error:", error.message);
    return res.status(500).json({ message: "Failed to fetch invoice" });
  }
}

// UPDATE
async function updateInvoice(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  try {
    const updatedInvoice = await invoiceRepo.updateById(id, req.body);
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    return res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error("Update invoice error:", error.message);
    return res.status(500).json({ message: "Failed to update invoice" });
  }
}

// DELETE
async function deleteInvoice(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const deletedInvoice = await invoiceRepo.deleteById(id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    return res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Delete invoice error:", error.message);
    return res.status(500).json({ message: "Failed to delete invoice" });
  }
}

module.exports = {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
