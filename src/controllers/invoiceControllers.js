const Invoice = require("../models/invoice");

// CREATE
async function addInvoice(req, res) {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Failed to add invoice:", error);
    res.status(500).json({ message: "Failed to add invoice" });
  }
}

// RETRIEVE ALL
async function getAllInvoices(req, res) {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
}

// RETRIEVE ONE
async function getInvoiceById(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    res.status(400).json({ message: "Invalid invoice ID" });
  }
}

// UPDATE
async function updateInvoice(req, res) {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error("Failed to update invoice:", error);
    res.status(400).json({ message: "Failed to update invoice" });
  }
}

// DELETE
async function deleteInvoice(req, res) {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    res.status(400).json({ message: "Invalid invoice ID" });
  }
}

module.exports = {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
