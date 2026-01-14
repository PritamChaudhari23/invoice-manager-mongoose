const mongodb = require("mongodb");
const getDb = require("../config/database").getDb;

const invoiceRepository = {
  createInvoice: (invoice) => {
    const db = getDb();
    return db
      .collection("invoices")
      .insertOne(invoice)
      .then((result) => {
        console.log("Invoice created: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Creation error: ", error);
        throw error;
      });
  },

  updateInvoice: (id, updatedInvoice) => {
    const db = getDb();
    return db
      .collection("invoices")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updatedInvoice })
      .then((result) => {
        console.log("Invoice updated: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Update error: ", error);
        throw error;
      });
  },

  findInvoiceById: (id) => {
    const db = getDb();
    if (!mongodb.ObjectId.isValid(id)) {
      return Promise.reject("Invalid ID format");
    }
    return db
      .collection("invoices")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((invoice) => {
        console.log("Invoice found: ", invoice);
        return invoice;
      })
      .catch((error) => {
        console.log("Find error: ", error);
        throw error;
      });
  },

  deleteInvoiceById: (id) => {
    const db = getDb();
    if (!mongodb.ObjectId.isValid(id)) {
      return Promise.reject("Invalid ID format");
    }
    return db
      .collection("invoices")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log("Invoice deleted: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Delete error: ", error);
        throw error;
      });
  },

  fetchAllInvoices: () => {
    const db = getDb();
    return db
      .collection("invoices")
      .find()
      .toArray()
      .then((invoices) => {
        console.log("Invoices fetched: ", invoices);
        return invoices;
      })
      .catch((error) => {
        console.log("Fetch error: ", error);
        throw error;
      });
  },
};

module.exports = invoiceRepository;
