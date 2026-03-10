import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import invoiceActionUpdate from "../controllers/invoiceActionUpdate.js";
import getInvoices from "../controllers/getInvoices.js";
import search from "../controllers/search.js";
import getSingleInvoice from "../controllers/getSingleInvoiceData.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getInvoices',getInvoices)

router.post('/invoiceActionUpdate',invoiceActionUpdate)

router.get('/search',search)

router.get('/getInvoiceData',getSingleInvoice)

export default router