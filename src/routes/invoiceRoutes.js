const express = require("express");
const authenticateToken = require("../middlewares/authorization");
const {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceControllers");

// const {
//   addInvoice,
//   getAllInvoices,
//   getInvoiceById,
//   updateInvoice,
//   deleteInvoice,
// } = require("../controllers-mongoose/invoiceControllers");

const router = express.Router();

router.post("/addinvoice", authenticateToken, addInvoice); // CREATE
router.get("/invoices", authenticateToken, getAllInvoices); // RETRIEVE ALL
router.get("/invoices/:id", authenticateToken, getInvoiceById); // RETRIEVE ONE
router.put("/invoices/:id", authenticateToken, updateInvoice); // UPDATE
router.delete("/invoices/:id", authenticateToken, deleteInvoice); // DELETE

module.exports = router;

// ------------------------------------------------------------------------------------------------------
// // PUT modifies the entire record and PATCH modifies the parts of the record which client sends
// app.patch("/invoices/:id", authenticateToken, function (req, res) {
//   const invoiceId = req.params.id;

//   Invoice.findById(invoiceId)
//     .then((invoice) => {
//       if (!invoice) {
//         res.status(404).send("The invoice with the given ID was not found.");
//       } else {
//         if (req.body) {
//           console.log(req.body);
//           const updatedClientName = req.body.clientName || invoice.clientName;
//           const updatedAmount = req.body.amount || invoice.amount;
//           const updatedService = req.body.service || invoice.service;
//           const updatedPaymentMethod = req.body.paymentMethod || invoice.paymentMethod;
//           const updatedInvoiceDate = req.body.invoiceDate || invoice.invoiceDate;
//           const updatedIsPaid = req.body.isPaid !== undefined ? req.body.isPaid : invoice.isPaid;

//           const updatedInvoice = new Invoice(
//             invoiceId,
//             updatedClientName,
//             updatedAmount,
//             updatedService,
//             updatedPaymentMethod,
//             updatedInvoiceDate,
//             updatedIsPaid
//           );

//           updatedInvoice
//             .update()
//             .then((result) => console.log(result))
//             .catch((error) => console.log(error));

//           res.status(201).send("Invoice updated successfully");
//         }
//       }
//     })
//     .catch(() => {
//       res.status(404).send("The invoice with the given ID was not found.");
//     });
// });
