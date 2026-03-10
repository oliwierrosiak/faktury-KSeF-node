import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import invoiceActionUpdate from "../controllers/invoiceActionUpdate.js";
import getInvoices from "../controllers/getInvoices.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getAllInvoices',getInvoices)

router.post('/invoiceActionUpdate',invoiceActionUpdate)

export default router