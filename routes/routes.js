import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import invoiceActionUpdate from "../controllers/invoiceActionUpdate.js";
import getInvoices from "../controllers/getInvoices.js";
import search from "../controllers/search.js";
import getSingleInvoice from "../controllers/getSingleInvoiceData.js";
import updateComment from "../controllers/updateComment.js";
import updateInvoicePositionAction from "../controllers/updateInvoicePositionAction.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getInvoices',getInvoices)

router.put('/invoiceActionUpdate',invoiceActionUpdate)

router.get('/search',search)

router.get('/getInvoiceData',getSingleInvoice)

router.post('/updateComment',updateComment)

router.put('/updateInvoicePositionAction',updateInvoicePositionAction)

export default router