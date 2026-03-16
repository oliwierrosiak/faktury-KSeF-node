import { Router } from "express";
import downloadInvoices from "../controllers/downloadInvoices.js";
import getInvoices from "../controllers/getInvoices.js";
import search from "../controllers/search.js";
import getSingleInvoice from "../controllers/getSingleInvoiceData.js";
import updateComment from "../controllers/updateComment.js";
import updateInvoicePositionAction from "../controllers/updateInvoicePositionAction.js";
import updateInvoiceAction from "../controllers/updateInvoiceAction.js";

const router = new Router()

router.get('/downloadInvoices',downloadInvoices)

router.get('/getInvoices',getInvoices)

router.put('/invoiceActionUpdate',updateInvoiceAction)

router.get('/search',search)

router.get('/getInvoiceData',getSingleInvoice)

router.post('/updateComment',updateComment)

router.put('/updateInvoicePositionAction',updateInvoicePositionAction)

export default router