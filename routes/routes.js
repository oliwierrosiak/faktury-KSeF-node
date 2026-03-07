import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import getAllInvoices from "../controllers/getAllInvoices.js";
import invoiceActionUpdate from "../controllers/invoiceActionUpdate.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getAllInvoices',getAllInvoices)

router.post('/invoiceActionUpdate',invoiceActionUpdate)

export default router